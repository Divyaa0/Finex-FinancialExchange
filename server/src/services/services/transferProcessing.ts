import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Processor('transactionQueue')
export class transactionProcessing 

{
    constructor(
        @InjectRepository(UserInfo)
        private userTable: Repository<UserInfo>
    ){}
  @Process('makeTransfer')
  async txProcessing(transferDetails: Job) 
  {
    console.log('🚀 ~ TransactionProcessing ~ txProcessing ~ job:', transferDetails.id, transferDetails.data);
    const{sender,reciever,amount}=transferDetails.data

      console.log("🚀 ~ transferService ~ transferFunds ~ transferDetails:", transferDetails)
      return await this.userTable.manager.transaction(async (entityManager) => {
        // Lock the rows for the sender and receiver
        const fromUser = await entityManager.findOne(UserInfo, {
          where: { email: sender },
          lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService ~ fromUser:", fromUser)
  
        const toUser = await entityManager.findOne(UserInfo, {
          where: { email: reciever },
          lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService  ~ toUser:", toUser)
  
        if (!fromUser || !toUser) {
          return {
            error:true,
            message:"One of the users does not exist"
          }
        }
  
        if (fromUser.balance < amount) {
          return {
            error:true,
            message:"Insufficient balance"
          }
        }
  
        fromUser.balance -= amount;
        toUser.balance += amount;

        console.log("🚀  ~ fromUser:", fromUser)
        console.log("🚀 ~ toUser:", toUser)


     // Update both users' balances within the transaction
        await entityManager.save(fromUser);
        await entityManager.save(toUser);

        return {
          success:true,
          message:'Transaction Successfull'
        }
           
      });
  }
}

