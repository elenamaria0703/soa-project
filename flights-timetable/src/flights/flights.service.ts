import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { xml2json } from 'xml-js';


@Injectable()
export class FlightsService{

  constructor(){

  }

  async getFlightsTimeTable(departure: string, destination: string, date: string){
    const options = {
      method: 'GET',
      url: `https://timetable-lookup.p.rapidapi.com/TimeTable/${departure}/${destination}/${date}/`,
      params: {Max_Results: '3'},
      headers: {
        'X-RapidAPI-Key': 'db498966d7msh5e843e195bf928bp10dca3jsn886947b94215',
        'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
      }
    }

    const response = axios.request(options).then(function (response) {
      const result = JSON.parse(xml2json(response.data));
      const resp = result.elements[0].elements.slice(2).map( e => e.attributes)
      return resp.map( e => ({departName: e.FLSDepartureName, destName: e.FLSArrivalName, time: e.TotalFlightTime, departTime: e.FLSDepartureDateTime, destTime: e.FLSArrivalDateTime, flightType: e.FLSFlightType }))
    }).catch(function (error) {
      console.error(error);
      return "Error"
    });
    return response;

  }
}