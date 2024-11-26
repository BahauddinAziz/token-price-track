import { InjectModel } from "@nestjs/sequelize";
import { CHAIN } from "src/enums/chain.enum";
import UserAlertModel from "src/models/user.alert.model";

export default class UserService {
    constructor(
        @InjectModel(UserAlertModel) private readonly userAlertModel: typeof UserAlertModel
    ) { }

    public async setAlert(chain: CHAIN, alertPrice: number, email: `${string}@${string}.${string}`) {
        await this.userAlertModel.create({
            userId: 1,
            chain,
            alertPrice,
            email
        })

        return true;
    }
}