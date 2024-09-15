import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne ,JoinColumn} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Role } from './role.entity';
@Entity()
export class UserInfo
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({name:"role_id"})
  role: Role;
  
  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  receivedTransactions: Transaction[];
}
