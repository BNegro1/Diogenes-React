import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';

interface SearchFilterProps {
  onSearch: (artist: string, album: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (!artist && !album) {
      setShowAlert(true);
      return;
    }
    onSearch(artist, album);
  };

  return (
    <>
      <IonItem>
        <IonLabel position="floating">Artista</IonLabel>
        <IonInput
          value={artist}
          onIonChange={e => setArtist(e.detail.value!)}
          className="mt-2"
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Álbum</IonLabel>
        <IonInput
          value={album}
          onIonChange={e => setAlbum(e.detail.value!)}
          className="mt-2"
        />
      </IonItem>
      <IonButton
        className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
        expand="block"
        onClick={handleSearch}
      >
        Buscar
      </IonButton>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Error de Búsqueda"
        message="Por favor, ingrese al menos un criterio de búsqueda (artista o álbum)."
        buttons={['OK']}
      />
    </>
  );
};

export default SearchFilter;