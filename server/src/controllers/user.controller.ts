import { Body, Controller, Get, Inject, Param ,Post} from '@nestjs/common';
import { dataSourceOptions } from 'src/database/dataSource';
import { DataSource } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/services/interface/iuser.interface';

@Controller()
export class userController {
  constructor(
  @Inject('IUser')public readonly IUser:IUser
  )
  {}

  @Post('balances')
  async getAllBalances(@Body() request) 
  {
    const response=await this.IUser.getAllBalances(request)
    return response
   
  }


  @Post('/userDetails')
  async getUserDetails(@Body() request) 
  {

   const response= await this.IUser.getUserDetails(request)
   return response

    // Implementation here
  }
}
