import { Controller, Post, Get, Body, Query,Inject } from '@nestjs/common';
import { TransferDto } from 'src/services/dtos/makeTransfer.dto';
import { TransferHistoryFilterDto } from 'src/services/dtos/transferHistory.dto';
import { ITransfer } from 'src/services/interface/itransfer.interface';

@Controller()
export class transferController  {

  constructor(
    @Inject('ITransfer')public readonly ITransfer:ITransfer
    ){}

  @Post('transfer')
  async transferFunds(@Body() transferDto: TransferDto) {
    const response=await this.ITransfer.transferFunds(transferDto)
    console.log("🚀 ~ transferController ~ transferFunds ~ response:", response)
    return response
    // Implementation here
  }

  @Post('transferHistory')
  async TransferHistory(@Body() filterDto: any) 
  {
    // Implementation here
    console.log("sdfg")
    const response=await this.ITransfer.getTransferHistory(filterDto)
    console.log("🚀 ~ transferController ~ getTransferHistory ~ response:", response)
    return response
  }


}
