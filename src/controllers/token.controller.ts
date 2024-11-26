import { Controller, Get, Param } from "@nestjs/common";
import { CHAIN } from "src/enums/chain.enum";
import TokenService from "src/services/token.service";

@Controller('price')
export default class TokenController {
    constructor(
        private readonly tokenService: TokenService
    ) { }

    @Get('/:chain')
    async getPriceData(@Param('chain') chain: CHAIN) {
        return await this.tokenService.getPriceData(chain);
    }
}