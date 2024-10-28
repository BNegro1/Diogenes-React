import React, { useRef, useState } from 'react';
import { IonButton, IonIcon, IonText, IonSpinner, IonToast } from '@ionic/react';
import { cloudUpload } from 'ionicons/icons';
import { read, utils } from 'xlsx';
import { motion } from 'framer-motion';
import { VinylRecord, RawExcelRecord } from '../types/Record';
import { insertRecords } from '../db';

interface FileUploadProps {
  onUpload: (records: VinylRecord[]) => void;
}

const REQUIRED_HEADERS = [
  'CODIGO',
  'PRECIO',
  'ARTISTA',
  'ALBUM',
  'ESTADO',
  'INSERTO_POSTER',
  'FORMATO',
  'COMUNA',
  'CONTACTO',
] as const;

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateHeaders = (headers: string[]): boolean => {
    return REQUIRED_HEADERS.every((header) => headers.includes(header));
  };

  const processRecords = (rawRecords: RawExcelRecord[]): VinylRecord[] => {
    return rawRecords.map(record => ({
      CODIGO: String(record.CODIGO),
      PRECIO: Number(record.PRECIO),
      ARTISTA: String(record.ARTISTA),
      ALBUM: String(record.ALBUM),
      ESTADO: String(record.ESTADO),
      INSERTO_POSTER: String(record.INSERTO_POSTER || ''),
      FORMATO: String(record.FORMATO),
      COMUNA: String(record.COMUNA),
      CONTACTO: String(record.CONTACTO)
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const headers = utils.sheet_to_json<string[]>(worksheet, { header: 1 })[0];

        if (!validateHeaders(headers)) {
          setError('El archivo no tiene el formato correcto. Por favor, verifica las columnas.');
          setIsLoading(false);
          return;
        }

        const rawRecords = utils.sheet_to_json<RawExcelRecord>(worksheet);
        const records = processRecords(rawRecords);

        try {
          await insertRecords(records);
          onUpload(records);
          setShowSuccess(true);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (dbError) {
          console.error('Error al insertar en la base de datos:', dbError);
          setError('Error al guardar los registros en la base de datos.');
        }
      } catch (err) {
        console.error('Error al procesar el archivo:', err);
        setError('Error al procesar el archivo. Por favor, intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo. Por favor, intenta nuevamente.');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-4"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <IonButton
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-xs"
          disabled={isLoading}
        >
          {isLoading ? (
            <IonSpinner name="crescent" />
          ) : (
            <>
              <IonIcon icon={cloudUpload} slot="start" />
              Cargar Archivo Excel
            </>
          )}
        </IonButton>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}

      <IonText color="medium" className="mt-4 text-sm">
        <p>Formatos soportados: .xlsx, .xls</p>
        <p className="mt-2">Columnas requeridas:</p>
        <code className="block mt-1 text-xs bg-gray-100 p-2 rounded">
          {REQUIRED_HEADERS.join(', ')}
        </code>
      </IonText>

      <IonToast
        isOpen={showSuccess}
        onDidDismiss={() => setShowSuccess(false)}
        message="Registros cargados exitosamente"
        duration={2000}
        position="bottom"
        color="success"
      />
    </motion.div>
  );
};

export default FileUpload;