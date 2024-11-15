import React from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { home, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-gradient-to-r from-[#1a1a1a] to-[#313131] shadow-md">
          <IonTitle className="text-gray-100 font-semibold">{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              className="text-gray-200 hover:text-white transition-colors" 
              onClick={() => history.push('/')}
            >
              <IonIcon icon={home} className="w-5 h-5" />
            </IonButton>
            <IonButton 
              className="text-gray-200 hover:text-white transition-colors" 
              onClick={() => history.push('/manager')}
            >
              <IonIcon icon={settings} className="w-5 h-5" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-[#f5f5f5]">
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Layout;