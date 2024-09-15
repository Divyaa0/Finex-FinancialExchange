"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./controllers/user.controller");
const transfer_controller_1 = require("./controllers/transfer.controller");
const user_service_1 = require("./services/services/user.service");
const transfer_service_1 = require("./services/services/transfer.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./database/entities/user.entity");
const transaction_entity_1 = require("./database/entities/transaction.entity");
const role_entity_1 = require("./database/entities/role.entity");
const bull_1 = require("@nestjs/bull");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123',
                database: 'finex',
                entities: [user_entity_1.UserInfo, transaction_entity_1.Transaction, role_entity_1.Role],
                synchronize: true,
                autoLoadEntities: true
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserInfo, transaction_entity_1.Transaction
            ]),
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            bull_1.BullModule.registerQueue({
                name: "transactionQueue",
                defaultJobOptions: {
                    attempts: 2
                },
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.userController, transfer_controller_1.transferController],
        providers: [app_service_1.AppService,
            {
                provide: "IUser",
                useClass: user_service_1.userService,
            },
            {
                provide: "ITransfer",
                useClass: transfer_service_1.transferService,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map