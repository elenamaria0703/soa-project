import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Booking from './Booking';
import { getLogger } from '../core';
import { BookingContext } from './BookingProvider';


const log = getLogger('ItemList');

export interface Airport {
  iata: string,
  name: string
}

const SearchAddBooking: React.FC<RouteComponentProps> = ({ history }) => {
  const { searchedBookings,searching, searchBookings, saveBooking} = useContext(BookingContext);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const departureAirports : Airport[] = [{iata: "BOS", name: "Boston"}, {iata: "VIE", name: "Wien"}, {iata: "BCN", name: "Barcelona"}, {iata: "PAR", name: "Paris"}, {iata: "JFK", name: "New York"}]
  const arrivalAirports : Airport[] = [{iata: "LAX", name: "Los Angeles"}, {iata: "OTP", name: "Bucharest"}, {iata: "ROM", name: "Rome"}, {iata: "LTN", name: "London"}, {iata: "FRA", name: "Frankfurt"}]
  log('render');

  const handleSearch = () => {
    searchBookings && searchBookings(departure, destination, date);
  };

  const handleSave = (user: string, departName: string, destName: string, time: string, departTime: string, destTime: string, flightType: string) => {
    console.log(user, departName, destName, time, departTime, destTime, flightType);
    saveBooking && saveBooking(user, departName, destName, time, departTime, destTime, flightType).then(() => history.goBack());
  };

  useEffect(() => {
  }, [searching]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem> 
            {departureAirports && (
              <IonSelect interface="popover" placeholder="Select departure airport" onIonChange={ e => setDeparture(e.detail.value || '') }>
                {departureAirports.map(({ iata, name }) =>
                  <IonSelectOption value={iata}>{name}</IonSelectOption>)}
              </IonSelect>
            )}
          </IonItem>
          <IonItem> 
            {arrivalAirports && (
              <IonSelect interface="popover" placeholder="Select arrival airport" onIonChange={ e => setDestination(e.detail.value || '') }>
                {arrivalAirports.map(({ iata, name }) =>
                  <IonSelectOption value={iata}>{name}</IonSelectOption>)}
              </IonSelect>
            )}
          </IonItem>
          <IonItem> 
            <IonLabel>Departure Date</IonLabel>
            <IonInput value={date} onIonChange={e => setDate(e.detail.value || '')} />
          </IonItem>
        </IonList>
        <IonButton onClick={handleSearch}>
          Search Bookings
        </IonButton>
        <IonLoading isOpen={searching} message="Searching Bookings"/>
        {searchedBookings && (
          <IonList>
            {searchedBookings.map(({  user, departName, destName, time, departTime, destTime, flightType }) =>
              <IonItem>
                <Booking user={user} departName={departName} destName={destName} time={time} departTime={departTime} destTime={destTime} flightType={flightType}/>
                <IonButton onClick={()=>handleSave(user, departName, destName, time, departTime, destTime, flightType)}>Add Booking</IonButton>
              </IonItem>)}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchAddBooking;
