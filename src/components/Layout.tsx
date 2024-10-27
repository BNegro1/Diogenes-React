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
import { home, library, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>
              <IonIcon icon={home} />
            </IonButton>
            <IonButton onClick={() => history.push('/catalog')}>
              <IonIcon icon={library} />
            </IonButton>
            <IonButton onClick={() => history.push('/manager')}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Layout;