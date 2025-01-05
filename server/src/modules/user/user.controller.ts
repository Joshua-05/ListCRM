import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListService } from '../list/list.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly listService: ListService
    ){}

    @ApiTags('User')
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
        const user = request.user;
        return this.userService.updateUser(user.email, updateDto);
    }

    @ApiTags('User')
    @Delete()
    deleteUser ( @Req() request ): Promise<boolean> {
        const user = request.user;
        return this.userService.deleteUser(user.email)
    }

    @ApiTags('User')
    @ApiResponse({ status: 200, type: Array })
    @Get('getList/:id')
    getAllList(@Param('id') id: number){
        return this.listService.findAllUserList(id)
    }

    @ApiTags('User')
    @Get('findUser/:email')
    findUser( @Param('email') email: string){
        return this.userService.findUserByEmail(email)
    }
}
