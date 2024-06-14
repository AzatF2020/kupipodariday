import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from 'src/users/dto/createUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  private signIn() {}

  @Post('/sign-up')
  private signUp(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
