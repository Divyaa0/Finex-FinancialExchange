import { IsOptional, IsString, IsDateString, IsNumber, IsPositive,IsEmail}from 'class-validator';


export class TransferHistoryFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minAmount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxAmount?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
