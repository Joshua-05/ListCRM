import { Body, Controller, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { DeleteListDTO, ListDTO } from './dto';

@Controller('list')
export class ListController {
    constructor(
        private listService: ListService
    ){}

    @Post('create')
    create(@Body() dto: ListDTO): Promise<ListDTO>{
        return this.listService.create(dto)
    }

    @Post('delete')
    destroy(@Body() dto: DeleteListDTO): Promise<boolean>{
        return this.listService.destroy(dto)
    }
}
