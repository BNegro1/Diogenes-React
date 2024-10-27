import React, { useState } from 'react';
import { IonContent, IonCard, IonCardContent } from '@ionic/react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SearchFilter from '../components/SearchFilter';
import RecordTable from '../components/RecordTable';
import { useStore } from '../store/useStore';
import { VinylRecord } from '../types/Record';
const Home: React.FC = () => {
  const records = useStore((state) => state.records);
  const [filteredRecords, setFilteredRecords] = useState<VinylRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (artist: string, album: string) => {
    const filtered = records.filter((record) => {
      const matchArtist = artist
        ? record.ARTISTA.toLowerCase().includes(artist.toLowerCase())
        : true;
      const matchAlbum = album
        ? record.ALBUM.toLowerCase().includes(album.toLowerCase())
        : true;
      return matchArtist && matchAlbum;
    });
    setFilteredRecords(filtered);
    setHasSearched(true);
  };

  return (
    <Layout title="Diogenes Discs">
      <IonContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className="h-[40vh] md:h-[50vh] bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Descubre Tu Vinilo Perfecto
              </h1>
              <p className="text-white text-lg md:text-xl opacity-90">
                Explora nuestra colección única de vinilos
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <IonCard>
            <IonCardContent>
              <SearchFilter onSearch={handleSearch} />
              {hasSearched && (
                <div className="mt-6">
                  <RecordTable records={filteredRecords} />
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </Layout>
  );
};

export default Home;