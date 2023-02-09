import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ClientProxyFactory, Transport, ClientOptions, ClientProxy } from "@nestjs/microservices";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { provider_host } from "src/config";

@UseGuards(JwtAuthGuard)
@Controller()
export class FlightsController {
  private client: ClientProxy;

  constructor(){
    const microserviceOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8085
      }
    }
    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  @Get('/flights/schedule/:departure/:destination/:date')
  async getFlights(@Param('departure') departure: string, @Param('destination') destination: string, @Param('date') date: string){
    return this.client.send<any, any>('schedule',{departure: departure, destination: destination, date: date})
  }
}