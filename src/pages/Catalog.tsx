import React from 'react';
import { IonContent, IonCard, IonCardContent } from '@ionic/react';
import Layout from '../components/Layout';
import RecordTable from '../components/RecordTable';
import { useStore } from '../store/useStore';

const Catalog: React.FC = () => {
  const records = useStore(state => state.records);

  return (
    <Layout title="Catálogo">
      <IonContent style={{ '--background': 'var(--ion-background-color)' }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <IonCard style={{ 
            '--background': 'var(--card-background)',
            '--box-shadow': 'var(--shadow-card)',
            borderColor: 'var(--border-color)'
          }}>
            <IonCardContent>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ion-text-color)' }}>
                Catálogo Completo
              </h2>
              <RecordTable records={records} />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </Layout>
  );
};

export default Catalog;