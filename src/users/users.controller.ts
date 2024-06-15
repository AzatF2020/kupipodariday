import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async profile(@Req() request) {
    const user = request.user;

    return 'logged as' + JSON.stringify(user);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async users() {
    return this.userService.findAll();
  }
}
