import {
  IsEmail,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export default class UpdateUserDto {
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;
}
