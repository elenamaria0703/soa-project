import { Injectable } from '@nestjs/common';
import { Booking } from './booking.interface';
import { CreateBooking } from './create-booking.dto';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class BookingService {
  constructor(@InjectInMemoryDBService('booking') private readonly db: InMemoryDBService<Booking>) {
    this.create({ user: 'a',
      departName: 'Henri Coanda Airport',
      destName: 'Birmingham',
      time: '4H45M',
      departTime: '2023-01-30T06:00:00',
      destTime: '2023-01-30T09:45:00',
      flightType: 'Connect'});
    this.create({ user: 'b',
      departName: 'Henri Coanda Airport',
      destName: 'Birmingham',
      time: '4H45M',
      departTime: '2023-01-30T06:00:00',
      destTime: '2023-01-30T09:45:00',
      flightType: 'Connect'});
  }

  findAll(): Booking[] {
    return this.db.getAll();
  }

  findOne(id: string): Booking {
    return this.db.get(id);
  }

  findUserBookings(user_id: string): Booking[]{
    const all = this.db.getAll();
    return all.filter( b => b.user === user_id)
  }

  create(dto: CreateBooking): Booking {
    const item = {
      user: dto.user,
      departName: dto.departName,
      destName: dto.destName,
      time: dto.time,
      departTime: dto.departTime,
      destTime: dto.destTime,
      flightType: dto.flightType,
      updated: Date.now(),
      version: 1,
    };
    return this.db.create(item);
  }

  update(item: Booking): Booking{
    this.db.update(item);
    return item;
  }


  delete(id: string) {
    this.db.delete(id);
  }
}
