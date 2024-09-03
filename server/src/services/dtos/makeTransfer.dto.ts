import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
  @IsEmail()
  @IsNotEmpty()
  sender: string;

  @IsEmail()
  @IsNotEmpty()
  receiver: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
