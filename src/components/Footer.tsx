import React from 'react';
import { IonFooter, IonToolbar } from '@ionic/react';
import { disc, logoInstagram, logoFacebook, logoTwitter } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer-container">
      <IonToolbar className="footer-toolbar">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo y nombre */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <IonIcon icon={disc} className="footer-icon" />
              <span className="footer-title">
                Diogenes Discs
              </span>
            </div>
            
            {/* Derechos reservados */}
            <div className="text-center">
              <p className="footer-text">
                © 2024 Diogenes Discs - Todos los derechos reservados
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center md:justify-end gap-6">
              <a href="#" className="footer-social-link">
                <IonIcon icon={logoInstagram} className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <IonIcon icon={logoFacebook} className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <IonIcon icon={logoTwitter} className="footer-social-icon" />
              </a>
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;