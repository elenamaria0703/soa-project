import { Controller, Get, Param } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { FlightsService } from "./flights.service";


@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService){}

  @MessagePattern('schedule')
  async getFlights(data){
    return this.flightsService.getFlightsTimeTable(data.departure, data.destination, data.date)
  }
}