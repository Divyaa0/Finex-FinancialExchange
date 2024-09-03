// import { Process, Processor } from "@nestjs/bull";
// import { Job } from "bull";
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserInfo } from 'src/database/entities/user.entity';
// import { Repository } from 'typeorm';
// import { EntityManager } from "typeorm";
// import { Queue } from "bullmq";

// @Processor('transactionQueue')
// export class transactionProcessing {
//     constructor(
//         @InjectRepository(UserInfo)
//         private userTable: Repository<UserInfo>
//     ) { }
//     @Process('makeTransfer')
//     async txProcessing(transferDetails: Job) {
//         console.log('🚀 ~ TransactionProcessing ~ txProcessing ~ job:', transferDetails.id, transferDetails.data);
       
// }

