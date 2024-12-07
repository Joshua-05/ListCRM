import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, UserResponse } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('registr')
    register(@Body() dto: CreateUserDTO): Promise<UserResponse> {
        return this.authService.register(dto)
    }
}
