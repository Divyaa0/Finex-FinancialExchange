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


    const tx = await this.userTable.manager.transaction(async (entityManager) => {
        // Fetch and lock users
        const fromUser = await this.getUserWithLock(entityManager, sender);

        const toUser = await this.getUserWithLock(entityManager, receiver);

        const validationError = await this.validateTransaction(fromUser, toUser, amount);
        if (validationError) {
            console.log("🚀 ~ transactionProcessing ~ tx ~ validationError:", validationError)
            return validationError;
        }

        // Process the transaction
        await this.updateBalances(fromUser, toUser, amount, entityManager);

        // Save updated users
        await entityManager.save(fromUser);
        await entityManager.save(toUser);

        return {
            success: true,
            message: 'Transaction Successful',
        };
        
    });
    console.log("🚀 ~ transactionProcessing ~ tx ~ message: 'Transaction Successful': 'Transaction Successful")
   

    return tx;
}

private async getUserWithLock(entityManager: EntityManager, email: string) {
    const user = await entityManager.findOne(UserInfo, {
        where: { email },
        lock: { mode: 'pessimistic_write' },
    });
    console.log(`🚀 ~ getUserWithLock ~ user:`, user);
    return user;
}

private async validateTransaction(fromUser: UserInfo | null, toUser: UserInfo | null, amount: number) {
    if (!fromUser || !toUser) {
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

    if (fromUser.balance < amount) {
        return {
            error: true,
            message: "Insufficient balance",
        };
    }

    return null;
}

private async updateBalances(fromUser: UserInfo, toUser: UserInfo, amount: number, entityManager: EntityManager) {
    fromUser.balance -= amount;
    toUser.balance += amount;

}


  
  

  async getTransferHistory(transferDetails): Promise<any> {
  
  }

}
