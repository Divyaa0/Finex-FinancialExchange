  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';

  // controllers
  import { userController } from './controllers/user.controller';
  import { transferController } from './controllers/transfer.controller';

  // interfaces
  import { userService } from './services/services/user.service';
  import { transferService } from './services/services/transfer.service';

  // 
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { dataSourceOptions } from './database/dataSource';
  import { UserInfo } from './database/entities/user.entity';
  import { Transaction } from './database/entities/transaction.entity';
  import { Role } from './database/entities/role.entity';

  // bullmq
import { BullModule } from '@nestjs/bull';
  import { transactionProcessing } from './services/services/transferProcessing';
  @Module({
    imports: [
      // database config
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'finex',
        entities: [UserInfo,Transaction,Role],
        synchronize: true,
        autoLoadEntities: true

      }),
      TypeOrmModule.forFeature([
        UserInfo
      ]),

      // BULLMQ
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
      
    }),

      BullModule.registerQueue({
        name: "transactionQueue",
        defaultJobOptions: {
          attempts: 2
        },},
    ),
      

    ],
    controllers: [AppController,userController,transferController],
    providers: [AppService,transactionProcessing,
      {
        provide: "IUser",
        useClass: userService,
      },
      {
        provide: "ITransfer",
        useClass: transferService,
      }
    
    ],
  })
  export class AppModule {
  }
