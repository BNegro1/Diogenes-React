import { useState } from 'react';
import { IonPage, IonContent, IonButton, IonInput, IonItem, IonLabel, IonAlert } from '@ionic/react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = () => {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      setIsLoggedIn(true);
    } else {
      setAlertMessage('Invalid credentials');
      setShowAlert(true);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, replace: boolean) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (typeof data === 'string') {
        if (file.name.endsWith('.xlsx')) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
          // Process CSV data
          console.log('Converted XLSX to CSV:', csvData);
        } else {
          // Process CSV directly
          console.log('CSV data:', data);
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  if (!isLoggedIn) {
    return (
      <IonPage>
        <IonContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 max-w-md mx-auto mt-10"
          >
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                value={credentials.username}
                onIonChange={e => setCredentials(prev => ({ ...prev, username: e.detail.value! }))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={credentials.password}
                onIonChange={e => setCredentials(prev => ({ ...prev, password: e.detail.value! }))}
              />
            </IonItem>
            <IonButton expand="block" className="mt-4" onClick={handleLogin}>
              Login
            </IonButton>
          </motion.div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Database Management</h2>
            
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-xl">Update Database</h3>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => handleFileUpload(e, false)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-xl">Replace Database</h3>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => handleFileUpload(e, true)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </div>
          </div>
        </motion.div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Notice"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Admin;