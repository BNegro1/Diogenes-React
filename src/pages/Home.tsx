import React, { useEffect } from 'react';
import { 
  IonContent, 
  IonCard, 
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol 
} from '@ionic/react';
import Layout from '../components/Layout';
import SearchFilter from '../components/SearchFilter';
import RecordTable from '../components/RecordTable';
import { useStore } from '../store/useStore';

const Home: React.FC = () => {
  const { records, loadAllRecords, searchRecordsFromDb } = useStore();

  useEffect(() => {
    loadAllRecords();
  }, [loadAllRecords]);

  const handleSearch = (artist: string, album: string) => {
    searchRecordsFromDb(artist, album);
  };

  return (
    <Layout title="Diogenes Discs">
      <IonContent>
        <div className="relative">
          <div className="absolute inset-0">
            <img 
              src="/img/hero.jpg" 
              alt="Hero background" 
              className="h-full w-full object-cover filter blur-sm"
            />
          </div>
          <div className="h-[40vh] md:h-[50vh] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navbar-start)]/80 to-[var(--color-navbar-end)]/70 flex items-center justify-center p-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-white mb-4"
                    style={{
                      WebkitTextStroke: '1px white',
                      color: 'black',
                    }}>
                  Descubre Tu Vinilo Perfecto
                </h1>
                <p className="text-3xl font-bold text-white mb-4"
                   style={{
                      WebkitTextStroke: '0.5px white',
                      color: 'black',
                   }}>
                  Explora nuestra colección única de vinilos
                </p>
              </div>
            </div>
          </div>
        </div>

        <IonGrid className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <IonRow>
            <IonCol size="12">
              <IonCard className="bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-[var(--transition-all)] ion-margin-vertical border border-gray-200">
                <IonCardContent className="p-6 sm:p-8">
                  <SearchFilter onSearch={handleSearch} />
                  <div className="mt-4">
                    <RecordTable records={records} />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Layout>
  );
};

export default Home;
