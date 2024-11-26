import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import AlertConsumer from 'src/consumers/alert.consumer';
import MoralisApi from 'src/integrations/moralis';
import TokenModel from 'src/models/token.model';
import TokenPriceModel from 'src/models/token.price.model';
import UserAlertModel from 'src/models/user.alert.model';
import UserModel from 'src/models/user.model';
import EmailService from 'src/services/email.service';
import { TaskService } from 'src/services/task.service';
import TokenModule from './token.module';
import UserModule from './user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'alert' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hyperhire',
      database: 'postgres',
      models: [UserModel, UserAlertModel, TokenModel, TokenPriceModel],
    }),
    SequelizeModule.forFeature([TokenPriceModel, UserAlertModel]),
    TokenModule,
    UserModule
  ],
  controllers: [],
  providers: [TaskService, MoralisApi, AlertConsumer, EmailService],
})
export class AppModule { }
