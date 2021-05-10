import { IsDateString, IsDecimal, IsString } from 'class-validator';

export class CreateSubscriptionRequest {
  @IsString() name: string;
  @IsDecimal() amount: number;
  @IsDateString() due: Date;
}
