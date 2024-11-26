import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
}

@Table({ tableName: 'users', timestamps: true })
export default class UserModel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    email: string;
}