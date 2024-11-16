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
        <IonToolbar className="bg-[var(--navbar-background)]">
          <IonTitle className={`font-semibold text-white ${title}`}>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="text-white"
              onClick={() => history.push('/')}
            >
              <IonIcon icon={home} />
            </IonButton>
            <IonButton
              className="text-white"
              onClick={() => history.push('/manager')}
            >
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Layout;
