import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import { useStore } from '../store/useStore';

const Manager: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { user, setUser, setRecords } = useStore();

  const handleLogin = () => {
    // Simple validation for demo purposes
    if (email === 'admin@example.com' && password === 'admin123') {
      setUser({ email, isAuthenticated: true });
    } else {
      setShowError(true);
    }
  };

  const handleFileUpload = (records: any[]) => {
    setRecords(records);
  };

  return (
    <Layout title="Administrador">
      <IonContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4"
        >
          {!user?.isAuthenticated ? (
            <IonCard>
              <IonCardContent>
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={e => setPassword(e.detail.value!)}
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  className="mt-4"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </IonButton>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonCard>
              <IonCardContent>
                <h2 className="text-2xl font-bold mb-4">Cargar Registros</h2>
                <FileUpload onUpload={handleFileUpload} />
              </IonCardContent>
            </IonCard>
          )}
        </motion.div>

        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header="Error de Autenticación"
          message="Credenciales inválidas. Por favor, intente nuevamente."
          buttons={['OK']}
        />
      </IonContent>
    </Layout>
  );
};

export default Manager;