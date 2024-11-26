import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TokenModel from "./token.model";

interface TokenPriceAttributes {
    id: number;
    tokenId: number;
    price: number;
}

@Table({ tableName: 'token_prices', timestamps: true })
export default class TokenPriceModel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => TokenModel)
    @Column
    tokenId: number;

    @Column({ type: DataType.DECIMAL })
    price: number;

    @BelongsTo(() => TokenModel)
    Token: TokenModel
}