import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from './config/firebase';
import Home from './pages/Home';
import Manager from './pages/Manager';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
import './index.css';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  useEffect(() => {
    logEvent(analytics, 'app_init');
  }, []);

  return (
    
    <IonApp>        
        {/* Desarrollado por @BNegro1 - https://github.com/BNegro1 */}
        {/* © 2024 Diogenes Discs - Todos los derechos reservados. */}
        {/* Página diseñada en colaboración con Diogenes Discs */}

      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          {/*<Route exact path="/catalog" component={Catalog} />*/}
          <Route exact path="/manager" component={Manager} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;