import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import CreateUserDto from 'src/users/dto/createUserDto';
import { LocalGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/signin')
  signIn(@Req() request) {
    console.log('work');
    return this.authService.auth(request?.user);
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return this.authService.auth(user);
  }
}
