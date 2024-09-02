import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/entities/user.entity';


@Injectable()
export class transferService {

  constructor(
    @InjectRepository(UserInfo)
    private userTable: Repository<UserInfo>,
  ){}
  


  async transferFunds(transferDetails): Promise<any> {
      const { sender, reciever, amount } = transferDetails;
  
      return await this.userTable.manager.transaction(async (entityManager) => {
        // Lock the rows for the sender and receiver
        const fromUser = await entityManager.findOne(UserInfo, {
          where: { email: sender },
          lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ fromUser:", fromUser)
  
        const toUser = await entityManager.findOne(UserInfo, {
          where: { email: reciever },
          lock: { mode: 'pessimistic_write' },
        });
        console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ toUser:", toUser)
  
        if (!fromUser || !toUser) {
          throw new BadRequestException('One of the users does not exist');
        }
  
        if (fromUser.balance < amount) {
          throw new BadRequestException('Insufficient balance');
        }
  
        fromUser.balance -= amount;
        toUser.balance += amount;

        console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ fromUser:", fromUser)
        console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ toUser:", toUser)


  
        // Update both users' balances within the transaction
        await entityManager.save(fromUser);
        await entityManager.save(toUser);
      });
    }
   

  async getTransferHistory(transferDetails): Promise<any> {
  
  }

}
