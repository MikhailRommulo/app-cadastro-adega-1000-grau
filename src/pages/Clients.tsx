import React, { useState, useEffect } from 'react';
import { IonContent,
         IonHeader,
         IonPage,
         IonTitle,
         IonToolbar,
         IonList,
         IonItem,
         IonGrid,
         IonRow,
         IonBadge,
         IonLabel,
         IonButton,
         IonIcon, 
         IonFab,
         IonFabButton} from '@ionic/react';

import axios from 'axios';
import './Clients.css';
import { trash, pencil, addOutline } from 'ionicons/icons';

interface ClientModel {
  id: string;
  name: string;
  phoneContact: string;
  email: string;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('https://adega-1000-grau.herokuapp.com/clients')
      .then(res => {
        setClients(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clients</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
          {clients.map( (client: ClientModel) => (
            <IonItem lines="none">
              <IonGrid>
                <IonRow className="ion-margin-vertical ion-justify-content-center">
                  <IonBadge 
                    className="ion-padding-horizontal ion-text-wrap" 
                    color="medium">
                      {client.name}
                  </IonBadge>
                </IonRow>
                <IonRow className="ion-margin-bottom">
                  <IonLabel>{client.phoneContact}</IonLabel>
                  <IonLabel 
                    className="ion-text-wrap">
                      {client.email}
                  </IonLabel>
                </IonRow>
                <IonRow className="ion-justify-content-between">
                  <IonButton color="mendium">
                    <IonLabel color="danger">
                      <IonIcon icon={trash} />
                      <strong>apagar</strong>
                    </IonLabel>  
                  </IonButton>
                  <IonButton color="mendium">
                    <IonLabel color="warning">
                      <IonIcon icon={pencil} />
                      <strong>editar</strong>
                    </IonLabel>
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonItem>
          )
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Clients;
