import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { ListDTO } from './dto';

@Injectable()
export class ListService {
    constructor(
        @InjectModel(List) private readonly listRepository: typeof List
    ){}

    async create(dto: ListDTO): Promise<ListDTO> {
        await this.listRepository.create({
            title: dto.title,
            userId: dto.userId,
            access: dto.access
        })
        return dto
    }
}
