import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Booking from './Booking';
import { getLogger } from '../core';
import { BookingContext } from './BookingProvider';

const log = getLogger('ItemList');

const BookingList: React.FC<RouteComponentProps> = ({ history }) => {
  const { bookings, fetching, fetchingError } = useContext(BookingContext);
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Bookings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching bookingd"/>
        {bookings && (
          <IonList>
            {bookings.map(({ _id, user, departName, destName, time, departTime, destTime, flightType }) =>
              <Booking key={_id} _id={_id} user={user} departName={departName} destName={destName} time={time} departTime={departTime} destTime={destTime} flightType={flightType}/>)}
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/add-booking')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default BookingList;
