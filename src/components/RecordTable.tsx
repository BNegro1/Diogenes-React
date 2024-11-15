import React, { useState } from 'react';
import {
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
  IonCard,
  IonCardContent,
  useIonViewDidEnter,
} from '@ionic/react';
import { chevronBack, chevronForward, logoInstagram, mail } from 'ionicons/icons';
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const totalPages = Math.ceil(records.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecords = records.slice(startIndex, startIndex + itemsPerPage);

  const getContactIcon = (contact: string) => {
    return contact.includes('@') ? mail : logoInstagram;
  };

  return (
    <div className="overflow-x-auto space-y-4">
      {/* Controles de paginación */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Registros por página:</span>
          <IonSelect
            value={itemsPerPage}
            onIonChange={e => setItemsPerPage(e.detail.value)}
            interface="popover"
          >
            {[20, 25, 35].map(num => (
              <IonSelectOption key={num} value={num}>
                {num}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>
        <div className="flex items-center gap-2">
          <IonButton disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
            <IonIcon icon={chevronBack} />
          </IonButton>
          <span>Página {currentPage} de {totalPages}</span>
          <IonButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
            <IonIcon icon={chevronForward} />
          </IonButton>
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {visibleRecords.map(record => (
            <IonRow key={record.CODIGO} 
                   className="items-center shadow-md rounded-lg p-4 mb-2"
                   style={{ 
                     backgroundColor: 'var(--card-background)',
                     boxShadow: '0 2px 4px var(--table-shadow)',
                     borderBottom: '1px solid var(--border-color)'
                   }}>
              <IonCol size="12">
                <div className="flex justify-between items-center space-y-2">
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--ion-text-color)' }}>
                    {record.ARTISTA}
                  </h2>
                  <IonBadge style={{ 
                    backgroundColor: 'var(--status-excelente)',
                    color: 'var(--ion-text-color)'
                  }}>
                    {record.ESTADO}
                  </IonBadge>
                </div>
                <p style={{ color: 'var(--ion-text-color)' }}>{record.ALBUM}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg" style={{ color: 'var(--ion-text-color)' }}>
                    ${record.PRECIO}
                  </span>
                  <span style={{ color: 'var(--ion-text-color)' }}>{record.FORMATO}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t" 
                     style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm" style={{ color: 'var(--ion-text-color)' }}>
                    Código: {record.CODIGO}
                  </span>
                  <IonButton fill="clear" onClick={() => setShowContact(record.CONTACTO)}>
                    <IonIcon icon={getContactIcon(record.CONTACTO)} />
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          ))}
        </div>
      ) : (
        /* Vista escritorio */
        <div>
          {/* Encabezado de tabla */}
          <IonRow className="font-bold rounded-lg p-4 mb-4 text-center" style={{
            backgroundColor: 'var(--ion-color-primary)',
            color: 'var(--ion-text-color)'
          }}>
            <IonCol size="1" className="text-center">Código</IonCol>
            <IonCol size="2" className="text-center">Artista</IonCol>
            <IonCol size="3" className="text-center">Álbum</IonCol>
            <IonCol size="1" className="text-center">Precio</IonCol>
            <IonCol size="1" className="text-center">Estado</IonCol>
            <IonCol size="2" className="text-center">Formato</IonCol>
            <IonCol size="2" className="text-center">Contacto</IonCol>
          </IonRow>

          {visibleRecords.map(record => (
            <IonRow key={record.CODIGO} 
                    className="items-center shadow-md rounded-lg p-4 mb-2"
                    style={{ 
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--ion-text-color)',
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--border-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-color)'}>
              <IonCol size="1" className="flex justify-center items-center" style={{ color: 'var(--ion-text-color)' }}>{record.CODIGO}</IonCol>
              <IonCol size="2" className="flex justify-center items-center" style={{ color: 'var(--ion-text-color)' }}>{record.ARTISTA}</IonCol>
              <IonCol size="3" className="flex justify-center items-center" style={{ color: 'var(--ion-text-color)' }}>{record.ALBUM}</IonCol>
              <IonCol size="1" className="flex justify-center items-center" style={{ color: 'var(--ion-text-color)' }}>${record.PRECIO}</IonCol>
              <IonCol size="1" className="flex justify-center items-center">
                <IonBadge style={{ backgroundColor: 'var(--status-excelente)', color: 'var(--ion-text-color)' }}>{record.ESTADO}</IonBadge>
              </IonCol>
              <IonCol size="2" className="flex justify-center items-center" style={{ color: 'var(--ion-text-color)' }}>{record.FORMATO}</IonCol>
              <IonCol size="2" className="flex justify-center items-center">
                <IonButton fill="clear" onClick={() => setShowContact(record.CONTACTO)}>
                  <IonIcon icon={getContactIcon(record.CONTACTO)} />
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
        </div>
      )}

      {/* Popover de contacto */}
      <IonPopover isOpen={!!showContact} onDidDismiss={() => setShowContact(null)}>
        {showContact && (
          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonIcon icon={getContactIcon(showContact)} slot="start" />
                  <IonLabel>{showContact}</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </IonPopover>
    </div>
  );
};

export default RecordTable;