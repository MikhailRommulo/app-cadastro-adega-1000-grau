import React, { useState, useEffect } from 'react';
import {
  IonContent,
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
  IonFabButton,
  IonAlert,
  IonCol
} from '@ionic/react';

import axios from 'axios';
import './Clients.css';
import { trash, pencil, addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { ClientModel } from '../models/client.interface';

const Clients: React.FC = () => {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [idAlert, setIdAlert] = useState<string>();
  const [nameAlert, setNameAlert] = useState<string>();

  useEffect(() => {
    refreshClients()
  }, []);

  function refreshClients() {
    axios.get('https://adega-1000-grau.herokuapp.com/clients')
      .then(res => {
        setClients(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function setDatasAlert (id: string, name: string) {
    setIdAlert(id);
    setNameAlert(name);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {clients.map((client: ClientModel) => (
            <IonItem key={client.id} lines="none">
              <IonGrid>
                <IonRow className="ion-margin-vertical ion-justify-content-center">
                  <IonBadge
                    className="ion-padding-horizontal ion-text-wrap"
                    color="medium">
                    {client.name}
                  </IonBadge>
                </IonRow>
                <IonRow>
                  <IonCol size="12" >
                    <IonLabel>{client.phoneContact}</IonLabel>
                  </IonCol>
                  <IonCol size="12">
                    <IonLabel
                      className="ion-text-wrap">
                      {client.email}
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom">
                  <IonLabel className="ion-text-wrap">{client.address}</IonLabel>
                </IonRow>
                <IonRow className="ion-justify-content-between">
                  <IonButton color="mendium" onClick={() => {
                    setDatasAlert(client.id, client.name);
                    setShowAlert(true);
                    }}>
                    <IonLabel color="danger">
                      <IonIcon icon={trash} />
                      <strong>apagar</strong>
                    </IonLabel>
                  </IonButton>
                  <IonButton color="mendium" onClick={() => {
                    history.push('/make-client', client);
                  }}>
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
          <IonFabButton onClick={() => history.push('/make-client')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonAlert 
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Apagar'}
          message={`Realmente vai excluir o(a) ${nameAlert}!`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancelada exclusão!')
              }
            },
            {
              text: 'Confirmar',
              handler: () => {
                axios.delete(`https://adega-1000-grau.herokuapp.com/clients/${idAlert}`)
                  .then(() => {
                    refreshClients();
                  })
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Clients;
