import { UserInfo } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../interface/iuser.interface';
import { JwtService } from '@nestjs/jwt';
export declare class userService implements IUser {
    private userTable;
    private jwtService;
    constructor(userTable: Repository<UserInfo>, jwtService: JwtService);
    getAllBalances(request: any): Promise<any>;
    getUserDetails(request: any): Promise<any>;
    validateUserDetails(request: any): Promise<any>;
}
