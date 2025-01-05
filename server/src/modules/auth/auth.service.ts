import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDTO, UserResponse } from './dto';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from '../user/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ){}

   

    async register(dto: CreateUserDTO): Promise<UserResponse> {
        const exist = await this.userService.findUserByEmail(dto.email)
        if (exist) throw new NotFoundException('a user with this data already exists')
        await this.userService.createUser(dto)
        return this.userService.publicUserData(dto.email) 
    }


    async login(dto: UserLoginDTO): Promise<UserResponse> {
        const exist = await this.userService.findUserByEmail(dto.email)
        if (!exist) throw new NotFoundException('not correct data')
        const validPassword = await bcrypt.compare(
            dto.password,
            exist.password,
        );
        if (!validPassword) throw new NotFoundException('not correct data')  
        return this.userService.publicUserData(dto.email)  
    }
}
