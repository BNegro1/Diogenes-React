import React, { useEffect } from 'react';
import { 
  IonContent, 
  IonCard, 
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol 
} from '@ionic/react';
import { motion } from 'framer-motion';
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
        {/* Desarrollado por @BNegro1 - https://github.com/BNegro1 */}
        {/* © 2024 Diogenes Discs - Todos los derechos reservados. */}
        {/* Página diseñada en colaboración con Diogenes Discs */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className="h-[40vh] md:h-[50vh] bg-cover bg-center relative"
            style={{
              backgroundImage:
                'url("img/hero.jpg")',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Descubre Tu Vinilo Perfecto
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white opacity-90">
                  Explora nuestra colección única de vinilos
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <IonGrid className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IonRow>
            <IonCol 
              size="12" 
              sizeSm="12" 
              sizeMd="10" 
              sizeLg="8" 
              offsetMd="1" 
              offsetLg="2"
            >
              <IonCard className="ion-margin-vertical">
                <IonCardContent className="p-4 sm:p-6">
                  <SearchFilter onSearch={handleSearch} />
                  <div className="mt-4 sm:mt-6">
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
