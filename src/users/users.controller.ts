import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMeInfo(@Req() request) {
    const userId = await request.user.id;
    return this.userService.findById(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateMeInfo(@Req() request, @Body() body) {
    const user = await request.user;
    return this.userService.update(user, body);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async findUserByUsername(@Param() params: { username: string }) {
    const username = params?.username;
    return this.userService.findBy('username', username);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllUsers() {
    return this.userService.findAll();
  }
}
