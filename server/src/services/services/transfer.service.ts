import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { TransferDto } from '../dtos/makeTransfer.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue ,} from 'bullmq';
import { Job } from 'bullmq';
import { EntityManager } from "typeorm";
import { IsNumber } from 'class-validator';


@Injectable()
export class transferService {

  constructor(
    @InjectRepository(UserInfo)
    private userTable: Repository<UserInfo>,
    @InjectQueue("transactionQueue") private txQueue: Queue,


  ){}
  
  async transferFunds(transferDetails:TransferDto)

  {
    const { sender, receiver, amount } = transferDetails
    console.log("🚀 ~ transferService ~ transferDetails:", transferDetails)


    // const tx = await this.userTable.manager.transaction(async (entityManager) => {

    //     // Fetch and lock users
    //     const senderEmail = await this.getUserWithLock(entityManager, sender);

    //     const receiverEmail = await this.getUserWithLock(entityManager, receiver);

    //     const validationError = await this.validateTransaction(senderEmail, receiverEmail, amount);
    //     if (validationError) {
    //         console.log("🚀 ~ transactionProcessing ~ tx ~ validationError:", validationError)
    //         return validationError;
    //     }

    //     // Process the transaction
    //     await this.updateBalances(senderEmail, receiverEmail, amount, entityManager);

        
    //     return {
    //         success: true,
    //         message: 'Transaction Successful',
    //     };
        
    // });
    // console.log("🚀 ~ transactionProcessing ~ tx ~ message: 'Transaction Successful': 'Transaction Successful")
   

    // return tx;

    const tx= await this.userTable.manager.transaction(async (entityManager) => {
        // Lock the rows for the sender and receiver
        const fromUser = await entityManager.findOne(UserInfo, {
            where: { email: sender },
            lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService ~ fromUser:", fromUser)

        const toUser = await entityManager.findOne(UserInfo, {
            where: { email: receiver },
            lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService  ~ toUser:", toUser)

        if (!fromUser || !toUser) {
            return {
                error: true,
                message: "One of the users does not exist"
            }
        }

        if (fromUser.balance < amount) {
            return {
                error: true,
                message: "Insufficient balance"
            }
        }
        console.log("🚀 Before ~ fromUser:", fromUser.balance)
        console.log("🚀 ~Before toUser:", toUser.balance)

        fromUser.balance -= amount;
        toUser.balance += amount;

        console.log("🚀 After ~ fromUser:", fromUser.balance)
        console.log("🚀 ~After toUser:", toUser.balance)


        // Update both users' balances within the transaction
        await entityManager.save(fromUser);
        await entityManager.save(toUser);

        return {
            success: true,
            message: 'Transaction Successfull'
        }
})}

private async getUserWithLock(entityManager: EntityManager, email: string) {
    const user = await entityManager.findOne(UserInfo, {
        where: { email },
        lock: { mode: 'pessimistic_write' },
    });
    console.log(`🚀 ~ getUserWithLock ~ user:`, user);
    return user;
}

private async validateTransaction(sender , receiver: UserInfo | null, amount: number) {
    console.log("🚀 ~ transferService ~ validateTransaction ~ amount:", amount)
    console.log("🚀 ~ transferService ~ validateTransaction ~ receiver:", receiver)
    console.log("🚀 ~ transferService ~ validateTransaction ~ sender:", sender.balance , "typeof -",typeof(sender.balance))
    if (!sender || !receiver) {
        return {
            error: true,
            message: "One of the users does not exist",
        };
    }
    if (!amount) {
      return {
          error: true,
          message: "Invalid Amount",
      };
    }
    let balance=sender.balance;
    let senderBalance :number = parseFloat(balance);
    console.log("🚀 ~ transferService ~ validateTransaction ~ senderBalance:", senderBalance,typeof(senderBalance))
   
    if (sender.balance < amount) {
        return {
            error: true,
            message: "Insufficient balance",
        };
    }

    return null;
}

private async updateBalances(sender: UserInfo, receiver: UserInfo, amount: number, entityManager: EntityManager) {
    console.log("🚀 ~ transferService ~ updateBalances ~ amount:", amount)
    console.log("🚀 ~ transferService ~ updateBalances ~ receiver:", receiver)
    console.log("🚀 ~ transferService ~ updateBalances ~ sender:", sender)
    sender.balance -= amount;
    receiver.balance += amount;

    // Save updated users
    await entityManager.save(sender);
    await entityManager.save(receiver);


}


  
  

  async getTransferHistory(transferDetails): Promise<any> {
  
  }

}
