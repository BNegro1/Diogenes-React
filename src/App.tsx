import { Suspense, lazy } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loading de páginas
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Admin = lazy(() => import('./pages/Admin'));

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => (
  <ThemeProvider>
    <IonApp>
      <IonReactRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Suspense fallback={<div>Loading...</div>}>
              <IonRouterOutlet>
                <Route exact path="/home" component={Home} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/catalog" component={Catalog} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>
            </Suspense>
          </AnimatePresence>
        </Layout>
      </IonReactRouter>
    </IonApp>
  </ThemeProvider>
);

export default App;