import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/auth/model/user.model";

@Table
export class List extends Model {
    @Column
    name: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    author: User;
}