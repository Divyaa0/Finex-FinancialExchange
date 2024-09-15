import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/entities/user.entity';
import { Transaction } from 'src/database/entities/transaction.entity';
import { TransferDto } from '../dtos/makeTransfer.dto';
import { TransferHistoryFilterDto } from '../dtos/transferHistory.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, } from 'bullmq';
import { Job } from 'bullmq';
import { EntityManager } from "typeorm";
import { IsNumber } from 'class-validator';
import { error } from 'console';
const Decimal = require('decimal.js')
import { Between } from 'typeorm';

@Injectable()
export class transferService {

    constructor(
        @InjectRepository(UserInfo)
        private userTable: Repository<UserInfo>,
        // transaction table
        @InjectRepository(Transaction)
        private transactionTable: Repository<Transaction>,

        @InjectQueue("transactionQueue") private txQueue: Queue,


    ) { }

    async transferFunds(transferDetails: TransferDto) {
        const { sender, receiver, amount } = transferDetails
        console.log("🚀 ~transferDetails:", transferDetails)



        const tx = await this.userTable.manager.transaction(async (entityManager) => {
            // Lock the rows for the sender and receiver

            // const senderAccount = await entityManager.findOne(UserInfo, {
            //     where: { email: sender },
            //     lock: { mode: 'pessimistic_write' },
            // });

            // const receiverAccount = await entityManager.findOne(UserInfo, {
            //     where: { email: receiver },
            //     lock: { mode: 'pessimistic_write' },
            // });
            const senderAccount = await this.getUserWithLock(entityManager, sender)
            console.log("🚀 ~ transferService ~ tx ~ senderAccount:", senderAccount)

            const receiverAccount = await this.getUserWithLock(entityManager, receiver);
            console.log("🚀 ~ transferService ~ tx ~ receiverAccount:", receiverAccount)

            const validateTransactionDetails = await this.validateTransaction(senderAccount, receiverAccount, amount)
            console.log("🚀 ~ transferService ~ tx ~ validateTransactionDetails:", validateTransactionDetails)

            if (validateTransactionDetails && validateTransactionDetails.error) {
                return validateTransactionDetails;
            }

            const makeTransfer = await this.updateBalances(senderAccount, receiverAccount, amount, entityManager);
            console.log("🚀 ~ transferService ~ tx ~ makeTransfer:", makeTransfer)

            if (makeTransfer.error) {
                return makeTransfer;
            }
            else {

                const newTransaction = this.transactionTable.create({
                    amount,
                    createdAt: new Date(),
                    sender: senderAccount,
                    receiver: receiverAccount,
                });
                await entityManager.save(Transaction, newTransaction);

                return {
                    success: true,
                    message: 'Transaction Successful',
                    description: `Amount ${amount} has been transferred from ${sender} to ${receiver}`
                }
            }

        })
        return tx;
    }

    private async getUserWithLock(entityManager: EntityManager, email: string) {
        const user = await entityManager.findOne(UserInfo, {
            where: { email },
            lock: { mode: 'pessimistic_write' },
        });
        return user;
    }

    private async validateTransaction(sender: UserInfo | null, receiver: UserInfo | null, amount: number | null) {
        console.log("🚀validateTransaction amount:", amount)
        console.log("🚀validateTransaction receiver:", receiver)

        let senderBalance = new Decimal(sender.balance);
        console.log("🚀   senderBalance:", senderBalance)


        let receiverBalance = new Decimal(receiver.balance);
        console.log(" receiverBalance:", receiverBalance)

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
        if (sender.balance < amount) {
            return {
                error: true,
                message: "Insufficient balance",
            };
        }
        return null;
    }

    private async updateBalances(senderAccount: UserInfo, receiverAccount: UserInfo, amount: number, entityManager: EntityManager) {


        try {
            let senderBalance = new Decimal(senderAccount.balance);
            console.log("🚀  BEFORE senderBalance:", senderBalance)


            let receiverBalance = new Decimal(receiverAccount.balance);
            console.log("🚀BEFORE receiverBalance:", receiverBalance)


            senderBalance = senderBalance.minus(amount);
            receiverBalance = receiverBalance.plus(amount);


            senderAccount.balance = senderBalance.toString();
            receiverAccount.balance = receiverBalance.toString();




            // Update both users' balances within the transaction
            await entityManager.save(senderAccount);
            await entityManager.save(receiverAccount);


            console.log("🚀 After ~ senderBalance:", senderAccount.balance)
            console.log("🚀 ~After receiverBalance:", receiverAccount.balance)


            return {
                success: true,
                message: 'Transaction Successfull'
            }

        }
        catch (error) {
            console.log("🚀 ~ transferService ~ updateBalances ~ error:", error)
            return {
                error: true,
                message: 'Error in making transaction'
            }
        }

    }



    // transafer history
    async getTransferHistory(transferHistoryDetails: TransferHistoryFilterDto) {
        const { email, startDate, endDate, minAmount, maxAmount } = transferHistoryDetails;
        console.log("🚀 ~ transferService ~ getTransferHistory ~ transferHistoryDetails:", transferHistoryDetails)
        if (email) {
            const findUser = await this.userTable.find({ where: { email: email } });
            console.log("🚀 ~ transferService ~ getTransferHistory ~ user:", findUser)
            if (!findUser) {
                return {
                    error: true,
                    message: 'No user found with this email'
                }
            }
            const userId = findUser[0].id;
            const fetchDetails = await this.transactionTable.find(
                {
                    where: { sender: { id: userId } },
                    relations: ['sender', 'receiver']
                }
            )
            console.log("🚀 ~ transferService ~ getTransferHistory ~ fetchDetails:", fetchDetails)
            return {
                success: true,
                details: fetchDetails
            }
        }
        if (startDate && endDate) {
      
            

        }
        if (minAmount && maxAmount)
        {
            const fetchDetails = await this.transactionTable.find({
                where: {
                    amount: Between(minAmount, maxAmount), // Fetch based on amount range
                },
                relations: ['sender', 'receiver'],
            });


            if (fetchDetails.length === 0) {
                return {
                    error: true,
                    message: 'No Transaction found within specified range',
                };
            }
            return{
                success:true,
                fetchDetails:fetchDetails
            }

        }

    }

}
