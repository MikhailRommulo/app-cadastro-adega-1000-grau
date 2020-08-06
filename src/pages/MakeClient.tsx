import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow
} from '@ionic/react';

import axios from 'axios';
import './MakeClient.css';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { ClientModel } from '../models/client.interface';

const MakeClient: React.FC = () => {
  const history = useHistory();

  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [address, setAddres] = useState<string>();
  const [phoneContact, setPhoneContact] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (history.location.state) {
      const clientPass = history.location.state as ClientModel;
      setId(clientPass.id);
      setName(clientPass.name);
      setAddres(clientPass.address);
      setPhoneContact(clientPass.phoneContact);
      setEmail(clientPass.email);
    } else {
      console.log('Não tem nada');
    }
  }, []);

  function changingOrMakeClient() {
    if (id) {
      axios.put(`https://adega-1000-grau.herokuapp.com/clients/${id}`, {
        name,
        address,
        phoneContact,
        email
      })
        .then(() => {
          history.push('/clients')
        })
    } else {
      axios.post('https://adega-1000-grau.herokuapp.com/clients', {
        name,
        address,
        phoneContact,
        email
      })
        .then(() => {
          history.push('/clients')
        })
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonLabel className="arrow-back ion-margin-start" onClick={() => history.goBack()}>
                <IonIcon icon={arrowBack} />
              </IonLabel>
              <IonTitle className="ion-margin-start">Cliente</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="full">
          <IonInput
            type='text'
            hidden
            value={id}
            onIonChange={e => { setId(e.detail.value!) }}
          ></IonInput>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput
              required
              type="text"
              value={name}
              onIonChange={e => { setName(e.detail.value!) }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Endereço</IonLabel>
            <IonInput
              required
              type="text"
              value={address}
              onIonChange={e => { setAddres(e.detail.value!) }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Telefone de contato</IonLabel>
            <IonInput
              required
              type="text"
              value={phoneContact}
              onIonChange={e => { setPhoneContact(e.detail.value!) }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">E-Mail</IonLabel>
            <IonInput
              required
              type="text"
              value={email}
              onIonChange={e => { setEmail(e.detail.value!) }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton
          color="primary"
          expand="block"
          className="ion-margin-top"
          onClick={changingOrMakeClient}
        >
          <IonLabel>Salvar</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MakeClient;
