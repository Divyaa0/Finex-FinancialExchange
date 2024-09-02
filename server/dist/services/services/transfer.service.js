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
const common_2 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
let transferService = class transferService {
    constructor(userTable) {
        this.userTable = userTable;
    }
    async transferFunds(transferDetails) {
        const { sender, reciever, amount } = transferDetails;
        return await this.userTable.manager.transaction(async (entityManager) => {
            const fromUser = await entityManager.findOne(user_entity_1.UserInfo, {
                where: { email: sender },
                lock: { mode: 'pessimistic_write' },
            });
            console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ fromUser:", fromUser);
            const toUser = await entityManager.findOne(user_entity_1.UserInfo, {
                where: { email: reciever },
                lock: { mode: 'pessimistic_write' },
            });
            console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ toUser:", toUser);
            if (!fromUser || !toUser) {
                throw new common_2.BadRequestException('One of the users does not exist');
            }
            if (fromUser.balance < amount) {
                throw new common_2.BadRequestException('Insufficient balance');
            }
            fromUser.balance -= amount;
            toUser.balance += amount;
            console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ fromUser:", fromUser);
            console.log("🚀 ~ transferService ~ returnawaitthis.userTable.manager.transaction ~ toUser:", toUser);
            await entityManager.save(fromUser);
            await entityManager.save(toUser);
        });
    }
    async getTransferHistory(transferDetails) {
    }
};
exports.transferService = transferService;
exports.transferService = transferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserInfo)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], transferService);
//# sourceMappingURL=transfer.service.js.map