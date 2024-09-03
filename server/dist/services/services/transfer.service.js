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
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let transferService = class transferService {
    constructor(userTable, txQueue) {
        this.userTable = userTable;
        this.txQueue = txQueue;
    }
    async transferFunds(transferDetails) {
        const { sender, receiver, amount } = transferDetails;
        console.log("🚀 ~ transferService ~ transferDetails:", transferDetails);
        const tx = await this.userTable.manager.transaction(async (entityManager) => {
            const fromUser = await this.getUserWithLock(entityManager, sender);
            const toUser = await this.getUserWithLock(entityManager, receiver);
            const validationError = await this.validateTransaction(fromUser, toUser, amount);
            if (validationError) {
                console.log("🚀 ~ transactionProcessing ~ tx ~ validationError:", validationError);
                return validationError;
            }
            await this.updateBalances(fromUser, toUser, amount, entityManager);
            await entityManager.save(fromUser);
            await entityManager.save(toUser);
            return {
                success: true,
                message: 'Transaction Successful',
            };
        });
        console.log("🚀 ~ transactionProcessing ~ tx ~ message: 'Transaction Successful': 'Transaction Successful");
        return tx;
    }
    async getUserWithLock(entityManager, email) {
        const user = await entityManager.findOne(user_entity_1.UserInfo, {
            where: { email },
            lock: { mode: 'pessimistic_write' },
        });
        console.log(`🚀 ~ getUserWithLock ~ user:`, user);
        return user;
    }
    async validateTransaction(fromUser, toUser, amount) {
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
    async updateBalances(fromUser, toUser, amount, entityManager) {
        fromUser.balance -= amount;
        toUser.balance += amount;
    }
    async getTransferHistory(transferDetails) {
    }
};
exports.transferService = transferService;
exports.transferService = transferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserInfo)),
    __param(1, (0, bullmq_1.InjectQueue)("transactionQueue")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        bullmq_2.Queue])
], transferService);
//# sourceMappingURL=transfer.service.js.map