import { UserInfo } from './user.entity';
export declare class Transaction {
    id: number;
    amount: number;
    sender: UserInfo;
    receiver: UserInfo;
    createdAt: Date;
}
