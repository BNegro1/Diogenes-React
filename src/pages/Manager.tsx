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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { insertRecords } from '../db';
import { VinylRecord } from '../types/Record';

const Manager: React.FC = () => {
  const [records, setRecords] = useState<VinylRecord[]>([]);
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFileUpload = (uploadedRecords: VinylRecord[]) => {
    setRecords(uploadedRecords);
  };

  const handleUpload = async () => {
    try {
      await insertRecords(records);
      alert('Records inserted successfully');
    } catch (error) {
      console.error('Error uploading records:', error);
      alert('Failed to insert records');
    }
  };

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error authenticating admin:', error);
      setShowError(true);
    }
  };

  return (
    <Layout title="Manager">
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12" sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <IonCard className="ion-margin">
                  <IonCardContent>
                    {isAuthenticated ? (
                      <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Cargar Registros</h2>
                        <FileUpload onUpload={handleFileUpload} />
                        {records.length > 0 && (
                          <div className="mt-4">
                            <IonButton expand="block" onClick={handleUpload}>
                              Upload Records
                            </IonButton>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Admin Login</h2>
                        <div className="space-y-4">
                          <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                              value={email}
                              onIonChange={(e) => setEmail(e.detail.value!)}
                              type="email"
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                              value={password}
                              onIonChange={(e) => setPassword(e.detail.value!)}
                              type="password"
                            />
                          </IonItem>
                          <IonButton expand="block" onClick={handleLogin}>
                            Login as Admin
                          </IonButton>
                        </div>
                      </>
                    )}
                  </IonCardContent>
                </IonCard>
              </motion.div>
            </IonCol>
          </IonRow>
        </IonGrid>

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