"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const transaction_entity_1 = require("../../database/entities/transaction.entity");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const Decimal = require('decimal.js');
const typeorm_3 = require("typeorm");
let transferService = class transferService {
    constructor(userTable, transactionTable, txQueue) {
        this.userTable = userTable;
        this.transactionTable = transactionTable;
        this.txQueue = txQueue;
    }
    async transferFunds(transferDetails) {
        const { sender, receiver, amount } = transferDetails;
        console.log("🚀 ~transferDetails:", transferDetails);
        const tx = await this.userTable.manager.transaction(async (entityManager) => {
            const senderAccount = await this.getUserWithLock(entityManager, sender);
            console.log("🚀 ~ transferService ~ tx ~ senderAccount:", senderAccount);
            const receiverAccount = await this.getUserWithLock(entityManager, receiver);
            console.log("🚀 ~ transferService ~ tx ~ receiverAccount:", receiverAccount);
            const validateTransactionDetails = await this.validateTransaction(senderAccount, receiverAccount, amount);
            console.log("🚀 ~ transferService ~ tx ~ validateTransactionDetails:", validateTransactionDetails);
            if (validateTransactionDetails && validateTransactionDetails.error) {
                return validateTransactionDetails;
            }
            const makeTransfer = await this.updateBalances(senderAccount, receiverAccount, amount, entityManager);
            console.log("🚀 ~ transferService ~ tx ~ makeTransfer:", makeTransfer);
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
                await entityManager.save(transaction_entity_1.Transaction, newTransaction);
                return {
                    success: true,
                    message: 'Transaction Successful',
                    description: `Amount ${amount} has been transferred from ${sender} to ${receiver}`
                };
            }
        });
        return tx;
    }
    async getUserWithLock(entityManager, email) {
        const user = await entityManager.findOne(user_entity_1.UserInfo, {
            where: { email },
            lock: { mode: 'pessimistic_write' },
        });
        return user;
    }
    async validateTransaction(sender, receiver, amount) {
        console.log("🚀validateTransaction amount:", amount);
        console.log("🚀validateTransaction receiver:", receiver);
        let senderBalance = new Decimal(sender.balance);
        console.log("🚀   senderBalance:", senderBalance);
        let receiverBalance = new Decimal(receiver.balance);
        console.log(" receiverBalance:", receiverBalance);
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
    async updateBalances(senderAccount, receiverAccount, amount, entityManager) {
        try {
            let senderBalance = new Decimal(senderAccount.balance);
            console.log("🚀  BEFORE senderBalance:", senderBalance);
            let receiverBalance = new Decimal(receiverAccount.balance);
            console.log("🚀BEFORE receiverBalance:", receiverBalance);
            senderBalance = senderBalance.minus(amount);
            receiverBalance = receiverBalance.plus(amount);
            senderAccount.balance = senderBalance.toString();
            receiverAccount.balance = receiverBalance.toString();
            await entityManager.save(senderAccount);
            await entityManager.save(receiverAccount);
            console.log("🚀 After ~ senderBalance:", senderAccount.balance);
            console.log("🚀 ~After receiverBalance:", receiverAccount.balance);
            return {
                success: true,
                message: 'Transaction Successfull'
            };
        }
        catch (error) {
            console.log("🚀 ~ transferService ~ updateBalances ~ error:", error);
            return {
                error: true,
                message: 'Error in making transaction'
            };
        }
    }
    async getTransferHistory(transferHistoryDetails) {
        const { email, startDate, endDate, minAmount, maxAmount } = transferHistoryDetails;
        console.log("🚀 ~ transferService ~ getTransferHistory ~ transferHistoryDetails:", transferHistoryDetails);
        if (email) {
            const findUser = await this.userTable.find({ where: { email: email } });
            console.log("🚀 ~ transferService ~ getTransferHistory ~ user:", findUser);
            if (!findUser) {
                return {
                    error: true,
                    message: 'No user found with this email'
                };
            }
            const userId = findUser[0].id;
            const SendDetails = await this.transactionTable.find({
                where: { sender: { id: userId } },
                relations: ['sender', 'receiver']
            });
            console.log("🚀 ~ transferService ~ getTransferHistory ~ fetchDetails:", SendDetails);
            const receiveDetails = await this.transactionTable.find({
                where: { receiver: { id: userId } },
                relations: ['sender', 'receiver']
            });
            return {
                success: true,
                sentTx: SendDetails,
                receivedTx: receiveDetails,
            };
        }
        if (startDate && endDate) {
        }
        if (minAmount && maxAmount) {
            const fetchDetails = await this.transactionTable.find({
                where: {
                    amount: (0, typeorm_3.Between)(minAmount, maxAmount),
                },
                relations: ['sender', 'receiver'],
            });
            if (fetchDetails.length === 0) {
                return {
                    error: true,
                    message: 'No Transaction found within specified range',
                };
            }
            return {
                success: true,
                fetchDetails: fetchDetails
            };
        }
    }
};
exports.transferService = transferService;
exports.transferService = transferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserInfo)),
    __param(1, (0, typeorm_2.InjectRepository)(transaction_entity_1.Transaction)),
    __param(2, (0, bullmq_1.InjectQueue)("transactionQueue")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        bullmq_2.Queue])
], transferService);
//# sourceMappingURL=transfer.service.js.map