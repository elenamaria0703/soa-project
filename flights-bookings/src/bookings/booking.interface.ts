import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsString, IsInt } from 'class-validator';

export class Booking implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() user: string;
  @IsString() departName: string;
  @IsString() destName: string;
  @IsString() time: string;
  @IsString() departTime: string;
  @IsString() destTime: string;
  @IsString() flightType: string;
  @IsInt() updated: number;
  @IsInt() version: number;
}
