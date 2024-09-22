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
import { UserInfo } from './database/entities/user.entity';
import { Transaction } from './database/entities/transaction.entity';
import { Role } from './database/entities/role.entity';

// bullmq
import { BullModule } from '@nestjs/bull';

// jwt
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './services/auth/constant';
import { AuthGuard } from './services/auth/jwtGuards';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60d' },
    }),
    // database config
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'finex',
      entities: [UserInfo, Transaction, Role],
      synchronize: true,
      autoLoadEntities: true

    }),
    TypeOrmModule.forFeature([
      UserInfo, Transaction
    ]),
   

  ],
  controllers: [AppController, userController, transferController],
  providers: [AppService,AuthGuard,
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
