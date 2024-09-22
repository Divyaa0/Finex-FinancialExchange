import { IUser } from 'src/services/interface/iuser.interface';
import { Request } from 'express';
export declare class userController {
    readonly IUser: IUser;
    constructor(IUser: IUser);
    getAllBalances(request: any): Promise<any>;
    getUserDetails(request: Request): Promise<any>;
    validateUser(request: any): Promise<any>;
}
