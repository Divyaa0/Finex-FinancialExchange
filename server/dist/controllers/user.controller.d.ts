import { IUser } from 'src/services/interface/iuser.interface';
export declare class userController {
    readonly IUser: IUser;
    constructor(IUser: IUser);
    getAllBalances(request: any): Promise<any>;
    getUserDetails(request: any): Promise<any>;
}
