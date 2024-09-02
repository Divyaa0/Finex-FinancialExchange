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
exports.userService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let userService = class userService {
    constructor(userTable) {
        this.userTable = userTable;
    }
    async getAllBalances(request) {
        try {
            const { email, password } = request;
            console.log("🚀 ~ userService ~ getUserDetails ~ email:", email);
            const userDetails = await this.userTable.findOne({
                relations: {
                    role: true,
                },
                where: {
                    email: email,
                },
            });
            console.log("🚀 ~ userService ~ getAllBalances ~ userDetails:", userDetails);
            if (!userDetails) {
                console.error("🚀 ~ userService ~ getUserDetails ~ User not found");
                return {
                    error: true,
                    message: "User not found",
                };
            }
            if (userDetails.password !== password) {
                console.error("🚀 ~ userService ~ getUserDetails ~ Invalid email or password");
                return {
                    error: true,
                    message: "Invalid email or password",
                };
            }
            console.log("🚀 ~ userService ~ getUserDetails ~ Password verified");
            if (userDetails.role.name !== "admin") {
                console.log("🚀 ~ userService ~ getUserDetails ~ Does not have admin access");
                const allUsers = await this.userTable.find();
                return {
                    error: true,
                    message: "User does not have admin access",
                };
            }
            const allUserDetails = await this.userTable.find();
            console.log("🚀 ~ userService ~ allUserDetails:", allUserDetails);
            return {
                success: true,
                message: "Admin access granted !",
                details: allUserDetails
            };
        }
        catch (error) {
            console.error("🚀 ~ userService ~ getUserDetails ~ Error:", error);
            return {
                error: true,
                message: "An unexpected error occurred while retrieving user details.",
            };
        }
    }
    async getUserDetails(request) {
        const { email, password } = request;
        console.log("🚀 ~ userService ~ getUserDetails ~ email:", email);
        const userDetails = await this.userTable.findOne({
            relations: {
                role: true,
            },
            where: { email: email }
        });
        if (userDetails && userDetails.password === password) {
            console.log("🚀 ~ userService ~ getUserDetails ~ Password verified");
            return userDetails;
        }
        else {
            console.error("🚀 ~ userService ~ getUserDetails ~ Invalid email or password");
            return {
                error: true,
                message: "Invalid email or password"
            };
        }
    }
};
exports.userService = userService;
exports.userService = userService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], userService);
//# sourceMappingURL=user.service.js.map