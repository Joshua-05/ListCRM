import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { DeleteListDTO, ListDTO, PublicateListDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('list')
export class ListController {
    constructor(
        private listService: ListService
    ){}

    @ApiTags('List')
    @ApiResponse({ status: 201, type: Boolean })
    @Post('create')
    create(@Body() dto: ListDTO): Promise<boolean>{
        return this.listService.create(dto)
    }

    @ApiTags('List')
    @ApiResponse({ status: 200, type: Array })
    @Get('getList/:id')
    getAllList(@Param('id') id: number){
        return this.listService.findAllUserList(id)
    }

    @ApiTags('List')
    @ApiResponse({ status: 204, type: Boolean })
    @Post('delete')
    destroy(@Body() dto: DeleteListDTO): Promise<boolean>{
        return this.listService.destroy(dto)
    }

    @ApiTags('List')
    @ApiResponse({ status: 200, type: Boolean })
    @Post('update')
    update(@Body() dto: PublicateListDTO): Promise<boolean>{
        return this.listService.update(dto)
    }
}
