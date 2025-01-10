import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateUserDTO {
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    username: string;
  
    @ApiProperty()
    @IsString()
    email: string;
}

export class FindListDTO {
    @ApiProperty()
    @IsNumber()
    id: number;
}