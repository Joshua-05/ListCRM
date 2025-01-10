import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { DeleteListDTO, ListDTO, PublicateListDTO } from './dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/models/product.model';
import { User } from '../user/model/user.model';
import { access } from 'fs';
import { where } from 'sequelize';
import { FindListDTO } from '../user/dto';

@Injectable()
export class ListService {
    constructor(
        @InjectModel(List) private readonly listRepository: typeof List,
        @InjectModel(User) private readonly userRepository: typeof User,
        private productService: ProductService
    ){}

    async create(dto: ListDTO): Promise<boolean> {

        const user = await this.userRepository.findByPk(dto.userId)
        if (!user){
            throw new NotFoundException('this user unexist')
        }
        const list = await this.listRepository.create({
            title: dto.title,
            userId: dto.userId,
            access: dto.access
        })

        if (!user.lists) {
            user.lists = [];
        }
        await user.lists.push(list)
        await user.save()

        const productList = {
            listId: list.id,
            products: dto.products
        }

        await this.productService.createProduct(productList)
        return true
    }

    async findAllUserList(dto : FindListDTO){
        return this.listRepository.findAll({
                where: {userId: dto.id},
                order: [['id', 'ASC']],
                include: [{
                    model: Product,
                    attributes: ['name', 'quantity', 'price']
                }]
            }  
        )
    }

    async destroy(dto: DeleteListDTO): Promise<boolean>{
        await this.listRepository.destroy({
            where: {id: dto.listId}
        })
        return true
    }

    async update(dto: PublicateListDTO): Promise<boolean>{
        const list = this.listRepository.findOne({
            where: {id: dto.id}
        })
        if (!list) {throw new NotFoundException('list not exist')}
        (await list).access = true;
        (await list).save()

        return true
    }

    async findAllList(){
        const lists = await this.listRepository.findAll({
            where: {access: true},
            include: [{
                model: Product,
                attributes: ['name', 'quantity', 'price']
            }]
        })
        return lists
    }
}
