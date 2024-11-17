import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store/useStore';
import CatalogTable from '../components/CatalogTable';
import { disc } from 'ionicons/icons';
import Footer from '../components/Footer';

const Catalog: React.FC = () => {
  const history = useHistory();
  const { allRecords, loadAllRecords, isLoading, resetFilters } = useStore();
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  React.useEffect(() => {
    resetFilters();
    loadAllRecords();
  }, [loadAllRecords, resetFilters]);

  const goHome = () => {
    resetFilters();
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <div className="flex justify-between items-center px-4">
            <div onClick={goHome} className="flex items-center gap-2 cursor-pointer">
              <IonIcon icon={disc} className="text-white text-2xl" />
              <h1 className="text-white text-xl">Tu Vinilo</h1>
            </div>
            <IonButtons slot="end">
              <IonButton fill="clear" color="light" onClick={goHome}>
                Inicio
              </IonButton>
              <IonButton fill="clear" color="light" onClick={() => history.push('/catalog')}>
                Catálogo
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Vinilos</h1>
            
            <div className="mb-6 flex items-center justify-end">
              <span className="mr-2">Mostrar por página:</span>
              <IonSelect
                value={itemsPerPage}
                onIonChange={e => setItemsPerPage(e.detail.value)}
                interface="popover"
                className="bg-[#e0e0e0] rounded-md"
              >
                <IonSelectOption value={10}>10</IonSelectOption>
                <IonSelectOption value={20}>20</IonSelectOption>
                <IonSelectOption value={50}>50</IonSelectOption>
              </IonSelect>
            </div>

            <CatalogTable 
              records={allRecords} 
              itemsPerPage={itemsPerPage}
              isLoading={isLoading}
            />
          </div>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Catalog;