import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    quantity: string

    @ApiProperty()
    @IsNumber()
    price: number
}

export class CreateProductDTO {
    @ApiProperty()
    @IsNumber()
    listId: number

    @ApiProperty()
    @IsArray()
    products: ProductDTO[]
}