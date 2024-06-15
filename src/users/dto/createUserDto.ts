import { IsEmail, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  about?: string = '«Пока ничего не рассказал о себе»';

  @IsString()
  @IsUrl()
  avatar?: string = 'https://i.pravatar.cc/300';
}
