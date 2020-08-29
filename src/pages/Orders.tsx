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
         IonFabButton,
         IonAlert} from '@ionic/react';
import { trash, pencil, addOutline } from 'ionicons/icons';
import './Orders.css';
import formatDateBrazil from '../utils/formatDateBrazil';
import { OrderModel } from '../models/order.interface';
import { useHistory } from 'react-router';
import api from '../services/api';

const Orders: React.FC = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [idAlert, setIdAlert] = useState<number>();
  const [nameClientAlert, setNameClientAlert] = useState<string>();

  useEffect(() => {
    refreshOrders();
  }, []);

  function refreshOrders() {
    api.get('orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function setDatasAlert (id: number, name: string) {
    setIdAlert(id);
    setNameClientAlert(name);
  }

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
                  <IonLabel className="ion-text-wrap">{order.client?.name}</IonLabel>
                  <IonBadge color="primary">R$ {order.value.toLocaleString( 'pt-BR',{minimumFractionDigits: 2})}</IonBadge>
                </IonRow>
                <IonRow className="ion-justify-content-between">
                  <IonButton color="mendium">
                    <IonLabel color="danger" onClick={() => {
                    setDatasAlert(order.id, order.client.name);
                    setShowAlert(true);
                    }}>
                      <IonIcon icon={trash} />
                      <strong>apagar</strong>
                    </IonLabel>  
                  </IonButton>
                  <IonButton color="mendium" onClick={() => {
                    history.push('/make-order', order);
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
          <IonFabButton onClick={() => {
            history.push('/make-order');
          }}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonAlert 
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Apagar'}
          message={`
            Realmente vai excluir o pedido ${idAlert} do cliente ${nameClientAlert}!`
          }
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
                api.delete(`orders/${idAlert}`)
                  .then(() => {
                    refreshOrders();
                  })
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
