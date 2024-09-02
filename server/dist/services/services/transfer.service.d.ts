import { Repository } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { TransferDto } from '../dtos/makeTransfer.dto';
export declare class transferService {
    private userTable;
    constructor(userTable: Repository<UserInfo>);
    transferFunds(transferDetails: TransferDto): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    getTransferHistory(transferDetails: any): Promise<any>;
}
