import { Body, Controller, Get, Inject, UseGuards ,Post,Req} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/services/interface/iuser.interface';
import { Request } from 'express';
import { AuthGuard } from 'src/services/auth/jwtGuards';

@Controller()
export class userController {
  constructor(
  @Inject('IUser')public readonly IUser:IUser
  )
  {}
  @UseGuards(AuthGuard)
  @Get('balances')
  async getAllBalances(@Body() request) 
  {
    const response=await this.IUser.getAllBalances(request)
    return response
   
  }

  @UseGuards(AuthGuard)
  @Post('/userDetails')
  async getUserDetails(@Req() request: Request ) 
  {

   const response= await this.IUser.getUserDetails(request)
   return response

    // Implementation here
  }

  @Post('/login')
  async validateUser(@Body() request) 
  {
   const response= await this.IUser.validateUserDetails(request)
   return response

    // Implementation here
  }
}