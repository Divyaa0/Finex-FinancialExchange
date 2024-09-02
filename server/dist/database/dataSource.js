"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const transaction_entity_1 = require("./entities/transaction.entity");
exports.dataSourceOptions = {
    type: 'postgres',
    host: `localhost`,
    port: 5432,
    username: `postgres`,
    password: "123",
    database: `finex`,
    entities: [user_entity_1.UserInfo, transaction_entity_1.Transaction],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: false,
};
const datasource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = datasource;
//# sourceMappingURL=dataSource.js.map