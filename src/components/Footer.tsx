import React from 'react';
import { IonFooter, IonToolbar } from '@ionic/react';
import { Disc, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <IonFooter className="bg-[#0a0a0a] mt-8">
      <IonToolbar className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo y nombre */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Disc className="text-white" size={24} />
              <span className="text-white text-lg font-bold">
                Diogenes Discs
              </span>
            </div>
            
            {/* Derechos reservados */}
            <div className="text-center">
              <p className="text-white text-sm">
                © 2024 Diogenes Discs - Todos los derechos reservados
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center md:justify-end gap-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;