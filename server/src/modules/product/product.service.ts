import { Injectable, NotFoundException } from '@nestjs/common';
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

    // async createProduct(productList: CreateProductDTO): Promise<boolean>{
    //     const listId = productList.listId

    //     const list = await this.listRepository.findByPk(listId)
    //     if (!list) {
    //         throw new NotFoundException('List not found');
    //     }
    //     if (!list.products) {
    //         list.products = [];
    //     }
    //     let product
    //     await productList.products.map(
    //         item => product =  this.productRepository.create({
    //             listId: listId,
    //             name: item.name,
    //             quantity: item.quantity,
    //             price: item.price
    //         }),
    //         await list.products.push(product),
    //     )
    //     await list.save()
    //     return true
    // }
    async createProduct(productList: CreateProductDTO): Promise<boolean> {
        const listId = productList.listId;
    
        const list = await this.listRepository.findByPk(listId);
        if (!list) {
            throw new NotFoundException('List not found');
        }
    
        for (const item of productList.products) {
            const product = await this.productRepository.create({
                listId: listId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            });
    
            if (!list.products) {
                list.products = [];
            }
            list.products.push(product);
        }
    
        await list.save();
        return true;
    }
}
