import { IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    name: string

    @IsString()
    quantity: string

    @IsNumber()
    price: number
}