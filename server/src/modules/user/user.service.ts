import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/model/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO, UpdateUserDTO } from '../user/dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User
    ){}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({
             where: { email: email }
        }); 
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

    async updateUser (email:string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        await this.userRepository.update(dto, {where: {email}})
        return dto
      }
    
      async deleteUser (email: string): Promise<boolean> {
        await this.userRepository.destroy({where:{email}});
        return true
      }
}
