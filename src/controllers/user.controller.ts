import { Body, Controller, Post } from "@nestjs/common";
import { CHAIN } from "src/enums/chain.enum";
import UserService from "src/services/user.service";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post('/alert/new')
    async setNewAlert(@Body() body: { chain: CHAIN, alertPrice: number, email: `${string}@${string}.${string}` }) {
        return await this.userService.setAlert(body.chain, body.alertPrice, body.email)
    }
}