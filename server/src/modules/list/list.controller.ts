import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { DeleteListDTO, ListDTO } from './dto';

@Controller('list')
export class ListController {
    constructor(
        private listService: ListService
    ){}

    @Post('create')
    create(@Body() dto: ListDTO): Promise<boolean>{
        return this.listService.create(dto)
    }

    @Get('getList/:id')
    getAllList(@Param('id') id: number){
        return this.listService.findAllUserList(id)
    }

    @Post('delete')
    destroy(@Body() dto: DeleteListDTO): Promise<boolean>{
        return this.listService.destroy(dto)
    }
}
