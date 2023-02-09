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
import { BookingService } from './booking.service';
import { Booking } from './booking.interface';
import { CreateBooking } from './create-booking.dto';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {
  }

  @MessagePattern('findAll')
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @MessagePattern('getBooking')
  async findOne(id: string): Promise<Booking> {
    const item = this.bookingService.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  @MessagePattern('getUserBookings')
  async findUserBookings(id: string): Promise<Booking[]> {
    const item = this.bookingService.findUserBookings(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }


  @MessagePattern('createBooking')
  async create(dto: CreateBooking): Promise<Booking> {
    const item = this.bookingService.create(dto);
    return item;
  }
  

  @MessagePattern('updateBooking')
  async update(item: Booking): Promise<Booking> {
    const dbItem = this.bookingService.findOne(item.id);
    if (!dbItem) {
      throw new GoneException();
    }
    if (dbItem.version > item.version) {
      throw new ConflictException();
    }
    const updatedItem = this.bookingService.update({ ...item, version: item.version + 1 });
    return updatedItem;
  }

  @MessagePattern('deleteBooking')
  async delete(id: string): Promise<void> {
    const item = this.bookingService.findOne(id);
    if (!item) {
      throw new GoneException();
    }
    this.bookingService.delete(id);
  }
}
