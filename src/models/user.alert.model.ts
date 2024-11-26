import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TokenModel from "./token.model";
import UserModel from "./user.model";

interface UserAlertAttributes {
    id: number;
    userId: number;
    tokenId: number;
    alertPrice: number;
    email: string;
}

@Table({ tableName: 'user_alerts', timestamps: true })
export default class UserAlertModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column
    userId: number;

    @ForeignKey(() => TokenModel)
    @Column
    tokenId: number;

    @Column
    alertPrice: number;

    @Column
    email: string;

    @BelongsTo(() => TokenModel)
    Token: TokenModel
}