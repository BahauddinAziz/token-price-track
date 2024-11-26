
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from 'bullmq';
import { Op } from 'sequelize';
import { CHAIN } from 'src/enums/chain.enum';
import MoralisApi from 'src/integrations/moralis';
import TokenPriceModel from 'src/models/token.price.model';
import UserAlertModel from 'src/models/user.alert.model';

@Injectable()
export class TaskService {

    constructor(
        private readonly moralisApi: MoralisApi,
        @InjectModel(TokenPriceModel) private readonly tokenPriceModel: typeof TokenPriceModel,
        @InjectModel(UserAlertModel) private readonly userAlertModel: typeof UserAlertModel,
        @InjectQueue('alert') private readonly alertQueue: Queue
    ) {
        console.log("Task: <update price every 5 minutes> started")
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async saveTokenPrice() {
        const priceETH = await this.moralisApi.getTokenPrice(CHAIN.etherium);
        {
            const alerts = await this.userAlertModel.findAll({ where: { tokenId: 1, alertPrice: { [Op.lte]: priceETH } } });
            for (const alert of alerts) {
                await this.alertQueue.add('send-alert', { alertId: alert.id })
            }
        }

        const pricePOL = await this.moralisApi.getTokenPrice(CHAIN.polygon);
        {
            const alerts = await this.userAlertModel.findAll({ where: { tokenId: 2, alertPrice: { [Op.lte]: pricePOL } } });
            for (const alert of alerts) {
                await this.alertQueue.add('send-alert', { alertId: alert.id })
            }
        }

        await this.tokenPriceModel.create({
            tokenId: 1,
            price: priceETH
        })

        await this.tokenPriceModel.create({
            tokenId: 2,
            price: pricePOL
        })

        await this.alertQueue.add('check-for-price-surge', {});

        console.log("Price Updated Successfully !!")
    }
}