import { useState } from 'react';
import { IonPage, IonSearchbar, IonList, IonItem, IonLabel, IonAlert } from '@ionic/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Disc, Search as SearchIcon } from 'lucide-react';

interface SearchFilters {
  artist?: string;
  album?: string;
}

interface SearchResult {
  id: number;
  artist: string;
  album: string;
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAlert, setShowAlert] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!filters.artist && !filters.album) {
      setShowAlert(true);
      return;
    }
    
    setIsSearching(true);
    // Simulated search results
    setTimeout(() => {
      setSearchResults([
        { id: 1, artist: 'Artist 1', album: 'Album 1' },
        { id: 2, artist: 'Artist 2', album: 'Album 2' },
      ]);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <IonPage>
      <div className="relative min-h-screen">
        {/* Hero Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80)',
            filter: 'brightness(0.3)'
          }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 pt-20"
          >
            {/* Hero Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                Discover Your Music
              </h1>
              <p className="text-xl text-gray-300">
                Search through millions of tracks in our database
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Music2 className="w-6 h-6 text-primary-light" />
                  <IonSearchbar
                    placeholder="Search by artist..."
                    value={filters.artist}
                    onIonChange={e => setFilters(prev => ({ ...prev, artist: e.detail.value! }))}
                    className="rounded-lg bg-white/5"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Disc className="w-6 h-6 text-primary-light" />
                  <IonSearchbar
                    placeholder="Search by album..."
                    value={filters.album}
                    onIonChange={e => setFilters(prev => ({ ...prev, album: e.detail.value! }))}
                    className="rounded-lg bg-white/5"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="w-full py-3 bg-primary-light hover:bg-primary text-white rounded-lg shadow-md flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span>Search</span>
                </motion.button>
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8"
                  >
                    <IonList className="bg-white/5 rounded-lg overflow-hidden">
                      {searchResults.map((result) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IonItem className="bg-transparent text-white">
                            <IonLabel>
                              <h2 className="text-lg font-semibold">{result.album}</h2>
                              <p className="text-gray-300">{result.artist}</p>
                            </IonLabel>
                          </IonItem>
                        </motion.div>
                      ))}
                    </IonList>
                  </motion.div>
                )}

                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 text-center text-white"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light mx-auto" />
                    <p className="mt-2">Searching...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Search Error"
          message="Please enter at least one search criteria"
          buttons={['OK']}
        />
      </div>
    </IonPage>
  );
};

export default Home;