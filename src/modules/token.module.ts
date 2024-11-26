import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import TokenController from "src/controllers/token.controller";
import TokenPriceModel from "src/models/token.price.model";
import TokenService from "src/services/token.service";

@Module({
    imports: [SequelizeModule.forFeature([TokenPriceModel])],
    controllers: [TokenController],
    providers: [TokenService]
})
export default class TokenModule { }