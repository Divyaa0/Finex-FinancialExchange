import { Controller, Post, Get, Body, Req,Inject,UseGuards } from '@nestjs/common';
import { TransferDto } from 'src/services/dtos/makeTransfer.dto';
import { TransferHistoryFilterDto } from 'src/services/dtos/transferHistory.dto';
import { ITransfer } from 'src/services/interface/itransfer.interface';
import { AuthGuard } from 'src/services/auth/jwtGuards';
@Controller()
export class transferController  {

  constructor(
    @Inject('ITransfer')public readonly ITransfer:ITransfer
    ){}

  @UseGuards(AuthGuard)
  @Post('transfer')
  async transferFunds(@Body() transferDto: TransferDto) {
    const response=await this.ITransfer.transferFunds(transferDto)
    console.log("🚀 ~ transferController ~ transferFunds ~ response:", response)
    return response
    // Implementation here
  }

  
  @UseGuards(AuthGuard)
  @Post('transferHistory')
  async TransferHistory(@Req() filterDto) 
  {
    // Implementation here
    const response=await this.ITransfer.getTransferHistory( filterDto)
    console.log("🚀 ~ transferController ~ getTransferHistory ~ response:", response)
    return response
  }


}
