import { UserInfo } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../interface/iuser.interface';
export declare class userService implements IUser {
    private userTable;
    constructor(userTable: Repository<UserInfo>);
    getAllBalances(request: any): Promise<any>;
    getUserDetails(request: any): Promise<any>;
}
