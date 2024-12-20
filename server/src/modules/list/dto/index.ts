import {  IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { ProductDTO } from "src/modules/product/dto";

export class ListDTO {
    @IsString()
    title: string

    @IsNumber()
    userId: number

    @IsArray()
    products: ProductDTO[]

    @IsBoolean()
    access: boolean
}

export class DeleteListDTO {
    @IsNumber()
    listId: number
}