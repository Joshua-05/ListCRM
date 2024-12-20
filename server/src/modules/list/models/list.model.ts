import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/auth/model/user.model";
import { Product } from "src/modules/product/models/product.model";

@Table
export class List extends Model {
    @Column
    title: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Product)
    products: Product[]

    @Column
    access: boolean;
}