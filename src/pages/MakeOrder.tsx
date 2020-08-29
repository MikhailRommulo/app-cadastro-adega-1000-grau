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
  IonRow,
  IonSelect,
  IonSelectOption,
  IonDatetime
} from '@ionic/react';

import './MakeClient.css';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { OrderModel } from '../models/order.interface';
import { ClientModel } from '../models/client.interface';
import api from '../services/api';

const MakeOrder: React.FC = () => {
  const history = useHistory();

  const [id, setId] = useState<number>();
  const [value, setValue] = useState<number>();
  const [dateOfOrder, setDateofOrder] = useState<Date>();
  const [client, setClient] = useState<ClientModel>();
  const [listClients, setListClients] = useState([{
      id: '', name: '', address: '', phoneContact: '', email: ''
  }]);

  useEffect(() => {
    populateClients();
    if (history.location.state) {
      const orderPass = history.location.state as OrderModel;
      setId(orderPass.id);
      setValue(orderPass.value);
      setDateofOrder(orderPass.dateOfOrder);
      setClient(orderPass.client);
    } else {
      console.log('Não tem nada');
    }
  }, []);

  function populateClients() {
    api.get('clients')
        .then((res) => {
            setListClients(res.data);
        })
  }

  function changingOrMakeOrder() {
    if (id) {
      api.put(`orders/${id}`, {
        client,
        value,
        dateOfOrder
      })
        .then(() => {
          history.push('/orders')
        })
    } else {
      api.post('orders', {
        client,
        value,
        dateOfOrder
      })
        .then(() => {
          history.push('/orders')
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
              <IonTitle className="ion-margin-start">Pedido</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="full">
          <IonInput
            type="number"
            hidden
            value={id}
            onIonChange={e => { setId(Number(e.detail.value!)) }}
          ></IonInput>
          <IonItem>
            <IonLabel position="floating">Cliente</IonLabel>
            <IonSelect
              value={client}
              okText="ok"
              cancelText="cancelar" 
              placeholder="Selecione um cliente" 
              onIonChange={e => setClient(e.detail.value)}
            >
              {listClients.map( (clientSelect: ClientModel) => (
                <IonSelectOption key={clientSelect.id} value={clientSelect}>
                    {clientSelect.name}
                </IonSelectOption>
              ))}              
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Valor</IonLabel>
            <IonInput
              required
              type="number"
              value={value}
              onIonChange={e => { setValue(Number(e.detail.value!)) }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Data e hora</IonLabel>
            <IonDatetime
                min="2020-08"
                cancelText="cancelar"
                doneText="ok" 
                displayFormat="DD/MM/YYYY-HH:mm" 
                value={dateOfOrder?.toString()}
                onIonChange={e => setDateofOrder(() => { 
                    let dt = new Date(e.detail.value!);
                    return dt;
                })}
            ></IonDatetime>
          </IonItem>
        </IonList>
        <IonButton
          color="primary"
          expand="block"
          className="ion-margin-top"
          onClick={changingOrMakeOrder}
        >
          <IonLabel>Salvar</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MakeOrder;
