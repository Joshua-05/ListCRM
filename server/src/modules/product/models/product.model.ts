import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { List } from "src/modules/list/models/list.model";

@Table

export class Product extends Model{
    @ForeignKey(() => List)
    @Column
    listId: number
    @BelongsTo(() => List)
    lists: List[]

    @Column
    name: string

    @Column
    quantity: string

    @Column
    price: number
}