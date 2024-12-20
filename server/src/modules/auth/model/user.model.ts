import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { List } from "src/modules/list/models/list.model";

@Table
export class User extends Model {
    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @HasMany(() => List)
    lists: List[]
}