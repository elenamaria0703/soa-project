import axios from 'axios';
import { authConfig, baseUrl, config, getLogger, withLogs } from '../core';
import { BookingProps } from './BookingProps';

export const getBookings: (token: string, user: string) => Promise<BookingProps[]> = (token, user) => {
  return withLogs(axios.get(`http://${baseUrl}/api/booking/user/${user}`, authConfig(token)), 'getBookings');
}

export const search: (token: string, departure: string, destination: string, date: string) => Promise<any> = (token, departure, destination, date) =>{
  return withLogs(axios.get(`http://${baseUrl}/flights/schedule/${departure}/${destination}/${date}`, authConfig(token)), 'searchBookings');
}

export const save: (token: string, user: string, departName: string, destName: string, time: string, departTime: string, destTime: string, flightType: string) => Promise<any> = (token, user, departName, destName, time, departTime, destTime, flightType ) =>{
  return withLogs(axios.post(`http://${baseUrl}/api/booking`, { user, departName, destName, time, departTime, destTime, flightType }, authConfig(token)), 'login');
}