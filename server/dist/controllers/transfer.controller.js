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
exports.transferController = void 0;
const common_1 = require("@nestjs/common");
const makeTransfer_dto_1 = require("../services/dtos/makeTransfer.dto");
let transferController = class transferController {
    constructor(ITransfer) {
        this.ITransfer = ITransfer;
    }
    async transferFunds(transferDto) {
        const response = await this.ITransfer.transferFunds(transferDto);
        console.log("🚀 ~ transferController ~ transferFunds ~ response:", response);
        return response;
    }
    async TransferHistory(filterDto) {
        console.log("sdfg");
        const response = await this.ITransfer.getTransferHistory(filterDto);
        console.log("🚀 ~ transferController ~ getTransferHistory ~ response:", response);
        return response;
    }
};
exports.transferController = transferController;
__decorate([
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [makeTransfer_dto_1.TransferDto]),
    __metadata("design:returntype", Promise)
], transferController.prototype, "transferFunds", null);
__decorate([
    (0, common_1.Post)('transferHistory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], transferController.prototype, "TransferHistory", null);
exports.transferController = transferController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('ITransfer')),
    __metadata("design:paramtypes", [Object])
], transferController);
//# sourceMappingURL=transfer.controller.js.map