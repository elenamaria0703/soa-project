import React from 'react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { BookingProps } from './BookingProps';

// interface ItemPropsExt extends BookingProps {
//   onEdit: (_id?: string) => void;
// }

const Booking: React.FC<BookingProps> = ({ _id, user, departName, destName, time, departTime, destTime, flightType }) => {
  return (
    <IonItem>
      <IonLabel>Departure Airport</IonLabel>
      <IonInput value={departName} disabled={true}></IonInput>
      <IonLabel>Destination Airport </IonLabel>
      <IonInput value={destName} disabled={true}></IonInput>
      <IonLabel>Flight Time </IonLabel>
      <IonInput value={time} disabled={true}></IonInput>
      <IonLabel>Departure Time </IonLabel>
      <IonInput value={departTime} disabled={true}></IonInput>
      <IonLabel>Arrival Time </IonLabel>
      <IonInput value={destTime} disabled={true}></IonInput>
      <IonLabel>Flight Type </IonLabel>
      <IonInput value={flightType} disabled={true}></IonInput>
    </IonItem>
  );
};

export default Booking;
