import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';


@Module({
  imports: [],
  controllers: [BookingController],
})
export class BookingModule {}
