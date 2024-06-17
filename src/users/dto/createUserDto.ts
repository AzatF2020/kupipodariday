import { IsEmail, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  username: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  email: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  password: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  about?: string = '«Пока ничего не рассказал о себе»';

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsUrl({}, { message: 'validation.INVALID_URL' })
  avatar?: string = 'https://i.pravatar.cc/300';
}
