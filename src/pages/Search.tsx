import { useState } from 'react';
import { IonPage, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonAlert } from '@ionic/react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilters {
  artist?: string;
  album?: string;
}

const Search: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (!filters.artist && !filters.album) {
      setShowAlert(true);
      return;
    }
    // Implement search logic here
  };

  return (
    <IonPage>
      <IonContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 space-y-4"
        >
          <IonSearchbar
            placeholder="Artist"
            value={filters.artist}
            onIonChange={e => setFilters(prev => ({ ...prev, artist: e.detail.value! }))}
            className="mb-2"
          />
          
          <IonSearchbar
            placeholder="Album"
            value={filters.album}
            onIonChange={e => setFilters(prev => ({ ...prev, album: e.detail.value! }))}
            className="mb-4"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md"
          >
            Search
          </motion.button>

          <AnimatePresence>
            {/* Search results would go here */}
            <IonList>
              {/* Example result items */}
            </IonList>
          </AnimatePresence>
        </motion.div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Search Error"
          message="Please enter at least one search criteria"
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Search;