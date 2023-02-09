import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ClientProxyFactory, Transport, ClientOptions, ClientProxy } from "@nestjs/microservices";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { provider_host } from 'src/config';
import { Booking } from './booking.interface';
@UseGuards(JwtAuthGuard)
@Controller('api/booking')
export class BookingController {
  private client: ClientProxy;

  constructor(){
    const microserviceOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5052
      }
    }
    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  @Get()
  async findAll() {
    return this.client.send('findAll', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.client.send<any, any>('getBooking', id);
  }

  @Get('user/:id')
  async findUserBookings(@Param('id') id: string) {
    return this.client.send<any, any>('getUserBookings', id)
  }


  @Post()
  async create(@Body() dto: Booking){
    console.log(dto)
    return this.client.send<any, any>('createBooking', dto)
  }
  

  @Put(':id')
  async update(@Body() item: Booking) {
    return this.client.send<any, any>('updateBooking', item)
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.client.send<any, any>('deleteBooking', id)
  }
}
