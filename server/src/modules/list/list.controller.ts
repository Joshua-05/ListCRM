import { Controller, Post } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor(
        private listService: ListService
    ){}

    @Post('create')
    create(){}
}
