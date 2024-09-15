import { TransferDto } from 'src/services/dtos/makeTransfer.dto';
import { ITransfer } from 'src/services/interface/itransfer.interface';
export declare class transferController {
    readonly ITransfer: ITransfer;
    constructor(ITransfer: ITransfer);
    transferFunds(transferDto: TransferDto): Promise<any>;
    TransferHistory(filterDto: any): Promise<any>;
}
