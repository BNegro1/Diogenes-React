import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navigation from './Navigation';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar className={`${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg`}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-4"
          >
            <IonTitle className="text-2xl font-bold text-primary">
              Music App
            </IonTitle>
            <IonButtons slot="end">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IonButton onClick={toggleTheme} className="w-10 h-10">
                  <IonIcon icon={theme === 'dark' ? Sun : Moon} />
                </IonButton>
              </motion.div>
            </IonButtons>
          </motion.div>
        </IonToolbar>
        <Navigation />
      </IonHeader>
      <IonContent className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
        {children}
      </IonContent>
    </>
  );
};

export default Layout;