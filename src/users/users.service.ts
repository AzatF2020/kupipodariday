import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.enitity';
import { hash } from 'bcrypt';
import CreateUserDto from './dto/createUserDto';
import UpdateUserDto from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findBy(key: string, param: string) {
    const user = await this.userRepository.findOne({
      where: { [key]: param },
    });
    return user;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const { id } = user;
    const dto = updateUserDto;

    if (dto.password) {
      dto.password = await hash(dto.password, 6);
    }

    await this.userRepository.update(id, dto as Partial<User>);

    const { password, ...candidate } = await this.userRepository.findOne({
      where: { id },
    });

    return candidate;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, email, ...rest } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw ForbiddenException;
    }

    const hashPassword = await hash(password, 6);

    return this.userRepository.save({
      ...rest,
      email,
      password: hashPassword,
    });
  }
}
