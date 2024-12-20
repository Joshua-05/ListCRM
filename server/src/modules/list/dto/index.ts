import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ListDTO {
    @IsString()
    title: string

    @IsNumber()
    userId: number

    @IsBoolean()
    access: boolean
}