import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, userData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Post(':id/profile')
  @UsePipes(new ValidationPipe())
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileDate: CreateUserProfileDto,
  ) {    
    return this.userService.createProfile({ userId: id, ...profileDate });
  }

  @Post(':id/post')
  @UsePipes(new ValidationPipe())
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: CreateUserPostDto,
  ) {    
    return this.userService.createPost({ userId: id, ...postData });
  }
}
