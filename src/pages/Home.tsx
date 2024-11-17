import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { search, disc } from 'ionicons/icons';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const history = useHistory();
  const { searchRecordsFromDb, resetFilters } = useStore();
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!artist && !album) {
      setError('Por favor ingrese al menos un término de búsqueda');
      return;
    }
    resetFilters();
    setError('');
    await searchRecordsFromDb(artist, album);
    history.push('/results');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
          <div 
            className="min-h-screen bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: 'url(/src/assets/img/hero.jpg)' }}
          >
            <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
              <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 text-center">
                Descubre Tu Vinilo Perfecto
              </h1>
              <p className="text-xl text-white mb-8 text-center">
                Explora nuestra colección única de vinilos
              </p>
              
              <div className="w-full max-w-2xl space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar por artista"
                        className="w-full p-3 pl-3 pr-10 rounded-lg bg-white text-[#0a0a0a] border-2 border-[#404040]"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button 
                        onClick={handleSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#404040] hover:text-[#0a0a0a]"
                      >
                        <IonIcon icon={search} className="text-xl" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar por álbum"
                        className="w-full p-3 pl-3 pr-10 rounded-lg bg-white text-[#0a0a0a] border-2 border-[#404040]"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button 
                        onClick={handleSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#404040] hover:text-[#0a0a0a]"
                      >
                        <IonIcon icon={search} className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <p className="text-[#ff1a1a] bg-white p-2 rounded text-center border-2 border-[#ff1a1a]">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;