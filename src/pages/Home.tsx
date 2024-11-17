import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const history = useHistory();
  const { searchRecordsFromDb } = useStore();
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');

  const handleSearch = async () => {
    await searchRecordsFromDb(artist, album);
    history.push('/results');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <div className="flex justify-between items-center px-4">
            <h1 className="text-white text-xl">Tu Vinilo</h1>
            <IonButtons slot="end">
              <IonButton fill="clear" color="light" onClick={() => history.push('/home')}>
                Inicio
              </IonButton>
              <IonButton fill="clear" color="light" onClick={() => history.push('/catalog')}>
                Catálogo
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div 
          className="h-screen bg-cover bg-center relative"
          style={{ 
            backgroundImage: 'url(/img/hero.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 text-center">
              Descubre Tu Vinilo Perfecto
            </h1>
            <p className="text-xl text-white mb-8 text-center">
              Explora nuestra colección única de vinilos
            </p>
            
            <div className="w-full max-w-2xl space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Escribe el nombre del artista"
                    className="w-full p-3 pr-10 rounded-lg bg-white bg-opacity-90 text-black"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Escribe el nombre del álbum"
                    className="w-full p-3 pr-10 rounded-lg bg-white bg-opacity-90 text-black"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="w-full md:w-auto mx-auto px-8 py-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;