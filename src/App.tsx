import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
// guarda estado fazendo o useEffect não funcionar direito
//import { IonReactRouter } from '@ionic/react-router';
import { documentText, people } from 'ionicons/icons';
import Orders from './pages/Orders';
import Clients from './pages/Clients';

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

/* Theme variables */
import './theme/variables.css';
import MakeClient from './pages/MakeClient';
import MakeOrder from './pages/MakeOrder';

const App: React.FC = () => (
  <IonApp>
    <BrowserRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/orders" component={Orders} exact={true} />
          <Route path="/clients" component={Clients} exact={true} />
          <Route path="/" render={() => <Redirect to="/orders" />} exact={true} />
          <Route path="/make-client" component={MakeClient} exact={true} />
          <Route path="/make-order" component={MakeOrder} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="orders" href="/orders">
            <IonIcon icon={documentText} />
            <IonLabel>Pedidos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clients" href="/clients">
            <IonIcon icon={people} />
            <IonLabel>Clientes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </BrowserRouter>
  </IonApp>
);

export default App;
