import { Repository } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { Transaction } from 'src/database/entities/transaction.entity';
import { TransferDto } from '../dtos/makeTransfer.dto';
import { Queue } from 'bullmq';
export declare class transferService {
    private userTable;
    private transactionTable;
    private txQueue;
    constructor(userTable: Repository<UserInfo>, transactionTable: Repository<Transaction>, txQueue: Queue);
    transferFunds(transferDetails: TransferDto): Promise<{
        error: boolean;
        message: string;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        description: string;
    }>;
    private getUserWithLock;
    private validateTransaction;
    private updateBalances;
    getTransferHistory(transferHistoryDetails: any): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
        sentTx?: undefined;
        receivedTx?: undefined;
    } | {
        success: boolean;
        sentTx: Transaction[];
        receivedTx: Transaction[];
        error?: undefined;
        message?: undefined;
    }>;
}
