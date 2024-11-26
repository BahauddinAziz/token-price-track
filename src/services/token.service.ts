import { InjectModel } from "@nestjs/sequelize";
import { QueryTypes } from "sequelize";
import { CHAIN } from "src/enums/chain.enum";
import TokenPriceModel from "src/models/token.price.model";

class TokenPriceResponseDto {
    id: number;
    price: number;

    static toResponse(tokenPriceModel: TokenPriceModel): TokenPriceResponseDto {
        return {
            id: tokenPriceModel.id,
            price: tokenPriceModel.price
        }
    }
}

export default class TokenService {
    constructor(
        @InjectModel(TokenPriceModel) private readonly tokenPriceModel: typeof TokenPriceModel
    ) { }

    async getPriceData(chain: CHAIN) {
        const tokenId = chain === CHAIN.etherium ? 1 : 2;
        const query = `
                SELECT 
                    DATE_TRUNC('hour', "createdAt") AS hour, 
                    MAX(price) AS price
                FROM token_prices
                WHERE "tokenId" = :tokenId
                AND "createdAt" >= NOW() - INTERVAL '24 hours'
                GROUP BY hour
                ORDER BY hour;
            `;

        const prices = await this.tokenPriceModel.sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { tokenId },
        });

        console.log(prices)

        return prices.map(TokenPriceResponseDto.toResponse);
    }
}