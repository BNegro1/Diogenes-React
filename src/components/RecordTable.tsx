import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonBadge,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  useIonViewDidEnter,
} from '@ionic/react';
import { motion, AnimatePresence } from 'framer-motion';
import { chevronBack, chevronForward, call, mail } from 'ionicons/icons';
import { VinylRecord } from '../types/Record';

interface RecordTableProps {
  records: VinylRecord[];
}

const RecordTable: React.FC<RecordTableProps> = ({ records }) => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContact, setShowContact] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useIonViewDidEnter(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const totalPages = Math.ceil(records.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecords = records.slice(startIndex, startIndex + itemsPerPage);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderContactInfo = (contact: string) => {
    const isEmail = contact.includes('@');
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <IonList>
          <IonItem>
            <IonIcon icon={isEmail ? mail : call} slot="start" />
            <IonLabel className="ion-text-wrap">{contact}</IonLabel>
          </IonItem>
        </IonList>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Registros por página:</span>
          <IonSelect
            value={itemsPerPage}
            onIonChange={e => setItemsPerPage(e.detail.value)}
            interface="popover"
            className="w-24"
          >
            <IonSelectOption value={20}>20</IonSelectOption>
            <IonSelectOption value={25}>25</IonSelectOption>
            <IonSelectOption value={35}>35</IonSelectOption>
          </IonSelect>
        </div>
        <div className="flex items-center gap-2">
          <IonButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <IonIcon icon={chevronBack} />
          </IonButton>
          <span className="mx-2 whitespace-nowrap">
            Página {currentPage} de {totalPages}
          </span>
          <IonButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <IonIcon icon={chevronForward} />
          </IonButton>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <IonGrid className="min-w-[800px]">
          <IonRow className="font-bold bg-gray-100 rounded-t-lg">
            <IonCol size={isMobile ? "6" : "1.5"}>Código</IonCol>
            <IonCol size={isMobile ? "6" : "2"}>Artista</IonCol>
            {!isMobile && (
              <>
                <IonCol size="2">Álbum</IonCol>
                <IonCol size="1.5">Precio</IonCol>
                <IonCol size="1.5">Estado</IonCol>
                <IonCol size="1.5">Formato</IonCol>
                <IonCol size="1">Comuna</IonCol>
                <IonCol size="1">Contacto</IonCol>
              </>
            )}
          </IonRow>

          <AnimatePresence mode="wait">
            {visibleRecords.map((record) => (
              <motion.div
                key={record.CODIGO}
                variants={item}
                layout
                whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                className="border-b"
              >
                {isMobile ? (
                  <IonRow className="py-2">
                    <IonCol size="12">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <strong>{record.CODIGO}</strong>
                          <span>${record.PRECIO}</span>
                        </div>
                        <div>
                          <div className="font-medium">{record.ARTISTA}</div>
                          <div className="text-gray-600">{record.ALBUM}</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <IonBadge color="primary" className="mr-2">{record.ESTADO}</IonBadge>
                            <IonBadge color="secondary">{record.FORMATO}</IonBadge>
                          </div>
                          <IonButton
                            size="small"
                            onClick={() => setShowContact(record.CONTACTO)}
                          >
                            Contacto
                          </IonButton>
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                ) : (
                  <IonRow className="items-center">
                    <IonCol size="1.5">{record.CODIGO}</IonCol>
                    <IonCol size="2">{record.ARTISTA}</IonCol>
                    <IonCol size="2">{record.ALBUM}</IonCol>
                    <IonCol size="1.5">${record.PRECIO}</IonCol>
                    <IonCol size="1.5">{record.ESTADO}</IonCol>
                    <IonCol size="1.5">{record.FORMATO}</IonCol>
                    <IonCol size="1">{record.COMUNA}</IonCol>
                    <IonCol size="1">
                      <IonButton
                        size="small"
                        fill="clear"
                        onClick={() => setShowContact(record.CONTACTO)}
                      >
                        <IonIcon icon={record.CONTACTO.includes('@') ? mail : call} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </IonGrid>
      </motion.div>

      <IonPopover
        isOpen={!!showContact}
        onDidDismiss={() => setShowContact(null)}
      >
        {showContact && renderContactInfo(showContact)}
      </IonPopover>
    </div>
  );
};

export default RecordTable;