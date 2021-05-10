import { IsDateString, IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionRequest {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsDecimal() amount?: number;
  @IsOptional() @IsDateString() due?: Date;
}
