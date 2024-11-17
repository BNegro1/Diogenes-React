import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const history = useHistory();
  const { searchRecordsFromDb, getPredictiveResults } = useStore();
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<{ artist: string[]; album: string[] }>({
    artist: [],
    album: []
  });
  const [showSuggestions, setShowSuggestions] = useState<{ artist: boolean; album: boolean }>({
    artist: false,
    album: false
  });

  const artistInputRef = useRef<HTMLInputElement>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions({ artist: false, album: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (artist.length > 2) {
      const results = getPredictiveResults(artist, 'artist');
      setSuggestions(prev => ({
        ...prev,
        artist: [...new Set(results.map(r => r.ARTISTA))]
      }));
      setShowSuggestions(prev => ({ ...prev, artist: true }));
    } else {
      setSuggestions(prev => ({ ...prev, artist: [] }));
      setShowSuggestions(prev => ({ ...prev, artist: false }));
    }
  }, [artist]);

  useEffect(() => {
    if (album.length > 2) {
      const results = getPredictiveResults(album, 'album');
      setSuggestions(prev => ({
        ...prev,
        album: [...new Set(results.map(r => r.ALBUM))]
      }));
      setShowSuggestions(prev => ({ ...prev, album: true }));
    } else {
      setSuggestions(prev => ({ ...prev, album: [] }));
      setShowSuggestions(prev => ({ ...prev, album: false }));
    }
  }, [album]);

  const handleSearch = async () => {
    if (!artist && !album) {
      setError('Por favor ingrese al menos un término de búsqueda');
      return;
    }
    setError('');
    await searchRecordsFromDb(artist, album);
    history.push('/results');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (value: string, type: 'artist' | 'album') => {
    if (type === 'artist') {
      setArtist(value);
      artistInputRef.current?.focus();
    } else {
      setAlbum(value);
      albumInputRef.current?.focus();
    }
    setShowSuggestions(prev => ({ ...prev, [type]: false }));
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
            
            <div className="w-full max-w-2xl space-y-4" ref={suggestionsRef}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="relative">
                    <input
                      ref={artistInputRef}
                      type="text"
                      placeholder="Buscar por artista"
                      className="w-full p-3 pl-3 pr-10 rounded-lg bg-white bg-opacity-90 text-black"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button 
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  {showSuggestions.artist && suggestions.artist.length > 0 && (
                    <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {suggestions.artist.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion, 'artist')}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <div className="relative">
                    <input
                      ref={albumInputRef}
                      type="text"
                      placeholder="Buscar por álbum"
                      className="w-full p-3 pl-3 pr-10 rounded-lg bg-white bg-opacity-90 text-black"
                      value={album}
                      onChange={(e) => setAlbum(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button 
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  {showSuggestions.album && suggestions.album.length > 0 && (
                    <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {suggestions.album.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion, 'album')}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {error && (
                <p className="text-red-500 bg-white bg-opacity-90 p-2 rounded text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;