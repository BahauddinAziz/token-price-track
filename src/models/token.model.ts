import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

interface TokenAttributes {
    id: number;
    name: string;
    shortCode: string;
}

@Table({ tableName: 'tokens', timestamps: true })
export default class TokenModel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    shortCode: string;
}