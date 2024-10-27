import React from 'react';
import { IonFooter, IonToolbar, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { motion } from 'framer-motion';
import { Disc, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IonToolbar color="primary" className="px-4 py-6">
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="12" sizeMd="4" className="text-center ion-text-md-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center md:justify-start gap-2"
                >
                  <Disc className="text-white" size={24} />
                  <span className="text-white text-lg font-bold">Vinyl Records</span>
                </motion.div>
              </IonCol>
              <IonCol size="12" sizeMd="4" className="text-center my-4 md:my-0">
                <p className="text-white text-sm">© 2024 Vinyl Records. Todos los derechos reservados.</p>
              </IonCol>
              <IonCol size="12" sizeMd="4" className="flex justify-center md:justify-end gap-4">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-white"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-white"
                >
                  <Facebook size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-white"
                >
                  <Twitter size={24} />
                </motion.a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </motion.div>
    </IonFooter>
  );
};

export default Footer;