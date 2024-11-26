import { Process, Processor } from "@nestjs/bull";
import { InjectQueue } from "@nestjs/bullmq";
import { InjectModel } from "@nestjs/sequelize";
import { Job, Queue } from "bullmq";
import { Op } from "sequelize";
import TokenPriceModel from "src/models/token.price.model";
import UserAlertModel from "src/models/user.alert.model";
import EmailService from "src/services/email.service";

@Processor('alert')
export default class AlertConsumer {

    constructor(
        @InjectModel(UserAlertModel) private readonly userAlertModel: typeof UserAlertModel,
        @InjectModel(TokenPriceModel) private readonly tokenPriceModel: typeof TokenPriceModel,
        @InjectQueue('alert') private readonly alertQueue: Queue,
        private readonly emailService: EmailService
    ) { }

    @Process('check-for-price-surge')
    async checkForPriceSurge(job: Job) {
        const lastEthPrice = await this.tokenPriceModel.findOne({
            where: {
                tokenId: 1
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        });

        const oneHourAgoEthPrice = await TokenPriceModel.findOne({
            where: {
                tokenId: 1,
                createdAt: {
                    [Op.gte]: new Date(Date.now() - 60 * 60 * 1000)
                }
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        });

        {
            const priceDifference = lastEthPrice.price - oneHourAgoEthPrice.price;
            if (priceDifference <= 0) return;
            const priceDifferencePercentage = ((priceDifference * 100) / oneHourAgoEthPrice.price);
            if (priceDifferencePercentage > 3) {
                await this.emailService.sendEMail({
                    to: 'hyperhire_assignment@hyperhire.in',
                    subject: "Price Increased by 3%",
                    body: "Price alert"
                })
            }
        }

        const lastPolPrice = await this.tokenPriceModel.findOne({
            where: {
                tokenId: 2
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        });

        const oneHourAgoPolPrice = await TokenPriceModel.findOne({
            where: {
                tokenId: 2,
                createdAt: {
                    [Op.gte]: new Date(Date.now() - 60 * 60 * 1000)
                }
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        });

        {
            const priceDifference = lastPolPrice.price - oneHourAgoPolPrice.price;
            if (priceDifference <= 0) return;
            const priceDifferencePercentage = ((priceDifference * 100) / oneHourAgoPolPrice.price);
            if (priceDifferencePercentage > 3) {
                await this.emailService.sendEMail({
                    to: 'hyperhire_assignment@hyperhire.in',
                    subject: "Price Increased by 3%",
                    body: "Price alert"
                })
            }
        }

    }

    @Process('send-alert')
    async sendAlert(job: Job) {
        const { alertId } = job.data;

        const alert = await this.userAlertModel.findOne(alertId);

        await this.emailService.sendEMail({
            to: alert.email,
            subject: "Price Alert",
            body: "Price has increased"
        })
    }
}