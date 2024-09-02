import { Transaction } from './transaction.entity';
import { Role } from './role.entity';
export declare class UserInfo {
    id: number;
    email: string;
    password: string;
    name: string;
    balance: number;
    role: Role;
    sentTransactions: Transaction[];
    receivedTransactions: Transaction[];
}
