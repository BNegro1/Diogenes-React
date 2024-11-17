import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ResultsTable from '../components/ResultsTable';
import { disc, arrowBack } from 'ionicons/icons';
import Footer from '../components/Footer';

const Results: React.FC = () => {
  const history = useHistory();
  const { records, isLoading, searchTerms, resetFilters } = useStore();
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

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

      <IonContent className="ion-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Resultados de la búsqueda</h1>
            <IonButton
              fill="clear"
              onClick={() => {
                resetFilters();
                history.push('/home');
              }}
              className="flex items-center"
            >
              <IonIcon icon={arrowBack} slot="start" />
              Nueva búsqueda
            </IonButton>
          </div>
          
          <div className="mb-6 flex items-center justify-end">
            <label className="mr-2 text-sm sm:text-base">Mostrar por página:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 border-2 border-[#404040] rounded-lg bg-white"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <ResultsTable 
            records={records} 
            itemsPerPage={itemsPerPage}
            isLoading={isLoading}
            searchTerms={searchTerms}
          />
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Results;