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

  ],
  controllers: [AppController,userController,transferController],
  providers: [AppService,
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
