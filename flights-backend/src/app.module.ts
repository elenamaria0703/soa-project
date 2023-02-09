import { Module } from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { FlightsModule } from './flights/flights.module';


@Module({
  imports: [AuthModule, FlightsModule, BookingModule]
})
export class AppModule {}
