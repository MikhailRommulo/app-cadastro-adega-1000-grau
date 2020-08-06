import React, { useState, useEffect } from 'react';
import { IonContent,
         IonHeader,
         IonPage,
         IonTitle,
         IonToolbar,
         IonList,
         IonItem,
         IonBadge,
         IonLabel,
         IonGrid,
         IonRow,
         IonButton,
         IonIcon, 
         IonFab,
         IonFabButton} from '@ionic/react';
import { trash, pencil, addOutline } from 'ionicons/icons';
import './Orders.css';
import axios from 'axios';
import formatDateBrazil from '../utils/formatDateBrazil';

interface ClientModel {
  id: string,
  name: string,
  phoneContact: string,
  email: string,
}

interface OrderModel {
  id: number;
  value: number;
  dateOfOrder: Date;
  client: ClientModel;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://adega-1000-grau.herokuapp.com/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {orders.map( (order: OrderModel) => (
            <IonItem key={order.id} lines="none">
              <IonGrid>
                <IonRow className="ion-margin-bottom ion-justify-content-between">
                  <IonBadge className="ion-padding-horizontal" color="medium">{order.id}</IonBadge>
                  <IonLabel className="ion-text-wrap">
                    {formatDateBrazil(order.dateOfOrder)}
                  </IonLabel>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-justify-content-between">
                  <IonLabel className="ion-text-wrap">{order.client.name}</IonLabel>
                  <IonBadge color="primary">R$ {order.value.toLocaleString( 'pt-BR',{minimumFractionDigits: 2})}</IonBadge>
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

export default Orders;
