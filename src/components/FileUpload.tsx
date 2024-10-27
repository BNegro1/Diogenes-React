import React, { useRef, useState } from 'react';
import { IonButton, IonIcon, IonText, IonSpinner } from '@ionic/react';
import { cloudUpload } from 'ionicons/icons';
import { read, utils } from 'xlsx';
import { motion } from 'framer-motion';
import { VinylRecord } from '../types/Record';

interface FileUploadProps {
  onUpload: (records: VinylRecord[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateHeaders = (headers: string[]) => {
    const requiredHeaders = [
      'CODIGO', 'PRECIO', 'ARTISTA', 'ALBUM', 'ESTADO',
      'INSERTO_POSTER', 'FORMATO', 'COMUNA', 'CONTACTO'
    ];
    
    return requiredHeaders.every(header => headers.includes(header));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
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

        const records = utils.sheet_to_json<VinylRecord>(worksheet);
        onUpload(records);
      } catch (err) {
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
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
          CODIGO, PRECIO, ARTISTA, ALBUM, ESTADO, INSERTO_POSTER, FORMATO, COMUNA, CONTACTO
        </code>
      </IonText>
    </motion.div>
  );
};

export default FileUpload;