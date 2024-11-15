import React from 'react';
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { Disc, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <div>
        {/* Ajustamos el toolbar para hacerlo más compacto */}
        <IonToolbar color="primary" className="px-4 py-4 md:py-6">
          <IonGrid className="max-w-7xl mx-auto">
            {/* Ajuste para dispositivos móviles */}
            <IonRow className="ion-align-items-center flex flex-col md:flex-row gap-4">
              {/* Columna del logo */}
              <IonCol
                size="12"
                sizeMd="4"
                className="text-center md:text-left mb-4 md:mb-0"
              >
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Disc className="text-white" size={24} />
                  <span className="text-white text-lg font-bold">
                    Diogenes Discs
                  </span>
                </div>
              </IonCol>
              
              {/* Columna de derechos reservados */}
              <IonCol
                size="12"
                sizeMd="4"
                className="text-center md:text-center mb-4 md:mb-0"
              >
                <p className="text-white text-xs md:text-sm">
                  © 2024 Diogenes Discs - Todos los derechos reservados.
                  <span className="sr-only">
                    Desarrollado por @BNegro1 - https://github.com/BNegro1
                  </span>
                </p>
              </IonCol>

              {/* Columna de iconos sociales */}
              <IonCol
                size="12"
                sizeMd="4"
                className="flex justify-center md:justify-end gap-4"
              >
                {/* Icono de Instagram */}
                <a href="#" className="text-white">
                  <Instagram size={20} className="hover:text-gray-300" />
                </a>

                {/* Icono de Facebook */}
                <a href="#" className="text-white">
                  <Facebook size={20} className="hover:text-gray-300" />
                </a>

                {/* Icono de Twitter */}
                <a href="#" className="text-white">
                  <Twitter size={20} className="hover:text-gray-300" />
                </a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </div>
    </IonFooter>
  );
};

export default Footer;
