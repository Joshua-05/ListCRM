import { IsArray, IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    name: string

    @IsString()
    quantity: string

    @IsNumber()
    price: number
}

export class CreateProductDTO {
    @IsNumber()
    listId: number

    @IsArray()
    products: ProductDTO[]
}