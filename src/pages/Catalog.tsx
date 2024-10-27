import React from 'react';
import { IonContent, IonCard, IonCardContent } from '@ionic/react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import RecordTable from '../components/RecordTable';
import { useStore } from '../store/useStore';

const Catalog: React.FC = () => {
  const records = useStore(state => state.records);

  return (
    <Layout title="Catálogo">
      <IonContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          <IonCard>
            <IonCardContent>
              <h2 className="text-2xl font-bold mb-4">Catálogo Completo</h2>
              <RecordTable records={records} />
            </IonCardContent>
          </IonCard>
        </motion.div>
      </IonContent>
    </Layout>
  );
};

export default Catalog;