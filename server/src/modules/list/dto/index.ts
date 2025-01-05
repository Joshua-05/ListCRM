import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { ProductDTO } from "src/modules/product/dto";

export class ListDTO {
    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNumber()
    userId: number

    @ApiProperty()
    @IsArray()
    products: ProductDTO[]

    @ApiProperty()
    @IsBoolean()
    access: boolean
}

export class DeleteListDTO {
    @ApiProperty()
    @IsNumber()
    listId: number
}

export class PublicateListDTO {
    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsBoolean()
    access: boolean
}