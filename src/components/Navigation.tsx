import { IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Database, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/catalog', label: 'Catalog', icon: Database },
    { path: '/admin', label: 'Admin', icon: Settings }
  ];

  return (
    <IonToolbar className="bg-transparent">
      <IonButtons className="flex justify-center space-x-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IonButton
                routerLink={link.path}
                routerDirection="none"
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-light bg-primary-light/10'
                    : 'text-gray-600 hover:text-primary-light hover:bg-primary-light/5'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </div>
              </IonButton>
            </motion.div>
          );
        })}
      </IonButtons>
    </IonToolbar>
  );
};

export default Navigation;