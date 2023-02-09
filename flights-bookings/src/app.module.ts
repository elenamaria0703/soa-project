import { Module } from '@nestjs/common';
import { BookingModule } from './bookings/booking.module';


@Module({
  imports: [BookingModule],

})
export class AppModule {}
