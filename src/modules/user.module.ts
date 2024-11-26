import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import UserController from "src/controllers/user.controller";
import UserAlertModel from "src/models/user.alert.model";
import UserService from "src/services/user.service";

@Module({
    imports: [SequelizeModule.forFeature([UserAlertModel])],
    controllers: [UserController],
    providers: [UserService]
})
export default class UserModule { }