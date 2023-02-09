import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forFeature('booking', {})],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
