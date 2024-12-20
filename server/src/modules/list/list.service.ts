import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { DeleteListDTO, ListDTO } from './dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/models/product.model';

@Injectable()
export class ListService {
    constructor(
        @InjectModel(List) private readonly listRepository: typeof List,
        private productService: ProductService
    ){}

    async create(dto: ListDTO): Promise<ListDTO> {
        
        const list = await this.listRepository.create({
            title: dto.title,
            userId: dto.userId,
            access: dto.access
        })

        const productList = {
            listId: list.id,
            products: dto.products
        }

        await this.productService.createProduct(productList)
        return dto
    }

    async findAllUserList(userId: number){
        return this.listRepository.findAll({
                where: {userId: userId},
                order: [['id', 'ASC']],
                include: [Product]
            }  
        )
    }

    async destroy(dto: DeleteListDTO): Promise<boolean>{
        await this.listRepository.destroy({
            where: {id: dto.listId}
        })
        return true
    }
}
