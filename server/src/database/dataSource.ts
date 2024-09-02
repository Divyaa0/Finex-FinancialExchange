import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
// load entities
import { UserInfo } from "./entities/user.entity";
import { Transaction } from "./entities/transaction.entity";



export const dataSourceOptions:DataSourceOptions={
    type: 'postgres',
    host: `localhost`,
    port: 5432,
    username: `postgres`,
    password: "123",
    database: `finex`,
    entities: [UserInfo,Transaction],
    migrations: ["dist/migrations/*{.ts,.js}"],
    // autoLoadEntities: true,
    synchronize: false,
}

const datasource=new DataSource(dataSourceOptions);
export default datasource;