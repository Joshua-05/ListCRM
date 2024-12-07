import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDTO, UserLoginDTO, UserResponse } from './dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userRepository: typeof User
    ){}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
        })
        return dto
    }

    async publicUserData(email:string){
        return this.userRepository.findOne({
            where: { email: email },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
    }

    async register(dto: CreateUserDTO): Promise<UserResponse> {
        const exist = await this.findUserByEmail(dto.email)
        if (exist) throw new NotFoundException('a user with this data already exists')
        await this.createUser(dto)
        return this.publicUserData(dto.email) 
    }


    async login(dto: UserLoginDTO): Promise<UserResponse> {
        const exist = await this.findUserByEmail(dto.email)
        if (!exist) throw new NotFoundException('not correct data')
        const validPassword = await bcrypt.compare(
            dto.password,
            exist.password,
        );
        if (!validPassword) throw new NotFoundException('not correct data')  
        return this.publicUserData(dto.email)  
    }
}
