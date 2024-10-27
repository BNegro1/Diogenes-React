import React, { useState } from 'react';
import {
  IonSearchbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
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
      <IonButton expand="block" className="mt-4" onClick={handleSearch}>
        Buscar
      </IonButton>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Error de Búsqueda"
        message="Por favor, ingrese al menos un criterio de búsqueda (artista o álbum)."
        buttons={['OK']}
      />
    </motion.div>
  );
};

export default SearchFilter;