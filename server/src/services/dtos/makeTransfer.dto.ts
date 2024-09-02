import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
  @IsEmail()
  @IsNotEmpty()
  senderEmail: string;

  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
