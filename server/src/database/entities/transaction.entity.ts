import { Entity, Column, PrimaryGeneratedColumn, ManyToOne ,JoinColumn} from 'typeorm';
import { UserInfo } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => UserInfo, (user) => user.sentTransactions)
  @JoinColumn({name:"sender"})
  sender: UserInfo;

  @ManyToOne(() => UserInfo, (user) => user.receivedTransactions)
  @JoinColumn({name:"reciever"})
  receiver: UserInfo;


  @Column()
  createdAt: Date;
}
