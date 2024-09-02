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
exports.userController = void 0;
const common_1 = require("@nestjs/common");
let userController = class userController {
    constructor(IUser) {
        this.IUser = IUser;
    }
    async getAllBalances(request) {
        const response = await this.IUser.getAllBalances(request);
        return response;
    }
    async getUserDetails(request) {
        const response = await this.IUser.getUserDetails(request);
        return response;
    }
};
exports.userController = userController;
__decorate([
    (0, common_1.Post)('balances'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getAllBalances", null);
__decorate([
    (0, common_1.Post)('/userDetails'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getUserDetails", null);
exports.userController = userController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('IUser')),
    __metadata("design:paramtypes", [Object])
], userController);
//# sourceMappingURL=user.controller.js.map