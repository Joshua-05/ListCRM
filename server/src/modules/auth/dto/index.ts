import { IsString } from "class-validator"

export class CreateUserDTO {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    password: string
}

export class UserResponse {
    @IsString()
    username: string

    @IsString()
    email: string
}

export class UserLoginDTO {
    @IsString()
    email: string;

    @IsString()
    password: string;
  }