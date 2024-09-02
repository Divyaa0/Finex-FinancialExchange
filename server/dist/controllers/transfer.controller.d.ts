import { TransferDto } from 'src/services/dtos/makeTransfer.dto';
import { TransferHistoryFilterDto } from 'src/services/dtos/transferHistory.dto';
import { ITransfer } from 'src/services/interface/itransfer.interface';
export declare class transferController {
    readonly ITransfer: ITransfer;
    constructor(ITransfer: ITransfer);
    transferFunds(transferDto: TransferDto): Promise<any>;
    getTransferHistory(filterDto: TransferHistoryFilterDto): void;
}
