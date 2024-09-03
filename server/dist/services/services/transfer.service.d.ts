import { Repository } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { TransferDto } from '../dtos/makeTransfer.dto';
import { Queue } from 'bullmq';
export declare class transferService {
    private userTable;
    private txQueue;
    constructor(userTable: Repository<UserInfo>, txQueue: Queue);
    transferFunds(transferDetails: TransferDto): Promise<void>;
    private getUserWithLock;
    private validateTransaction;
    private updateBalances;
    getTransferHistory(transferDetails: any): Promise<any>;
}
