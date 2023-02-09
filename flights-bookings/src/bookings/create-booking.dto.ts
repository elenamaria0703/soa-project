import { IsString } from 'class-validator';

export class CreateBooking {
  @IsString() user: string;
  @IsString() departName: string;
  @IsString() destName: string;
  @IsString() time: string;
  @IsString() departTime: string;
  @IsString() destTime: string;
  @IsString() flightType: string;
}
