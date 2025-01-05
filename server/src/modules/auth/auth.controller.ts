import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, UserLoginDTO, UserResponse } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags('Auth')
    @ApiResponse({ status: 201, type: UserResponse })
    @HttpCode(201)
    @Post('registr')
    register(@Body() dto: CreateUserDTO): Promise<UserResponse> {
        return this.authService.register(dto)
    }

    @ApiTags('Auth')
    @ApiResponse({ status: 200, type: UserResponse })
    @HttpCode(200)
    @Post('login')
    login(@Body() dto: UserLoginDTO): Promise<UserResponse> {
        return this.authService.login(dto)
    }
}
