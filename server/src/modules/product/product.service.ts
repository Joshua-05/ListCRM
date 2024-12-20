import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDTO, ProductDTO } from './dto';
import { List } from '../list/models/list.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private readonly productRepository: typeof Product,
        @InjectModel(List) private readonly listRepository: typeof List
    ){}

    async createProduct(productList: CreateProductDTO): Promise<boolean>{
        const listId = productList.listId

        const list = await this.listRepository.findByPk(listId)
        let product
        await productList.products.map(
            item => product =  this.productRepository.create({
                listId: listId,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }),
            await list.products.push(product),
        )
        await list.save()
        return true
    }
}
