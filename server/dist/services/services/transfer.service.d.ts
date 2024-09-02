import { Repository } from 'typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
export declare class transferService {
    private userTable;
    constructor(userTable: Repository<UserInfo>);
    transferFunds(transferDetails: any): Promise<any>;
    getTransferHistory(transferDetails: any): Promise<any>;
}
