import { IsEmail, IsString, IsUrl } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsString()
  @IsUrl()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
