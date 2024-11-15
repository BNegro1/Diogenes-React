import React from 'react';
import { IonContent, IonCard, IonCardContent } from '@ionic/react';
import Layout from '../components/Layout';
import RecordTable from '../components/RecordTable';
import { useStore } from '../store/useStore';

const Catalog: React.FC = () => {
  const records = useStore(state => state.records);

  return (
    <Layout title="Catálogo">
      <IonContent>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <IonCard>
            <IonCardContent>
              <h2 className="text-2xl font-bold mb-4">Catálogo Completo</h2>
              <RecordTable records={records} />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </Layout>
  );
};

export default Catalog;