import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.enitity';
import CreateUserDto from './dto/createUserDto';
import { hash } from 'bcrypt';

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

  async findAll() {
    return this.userRepository.find();
  }

  async create(createuserDto: CreateUserDto) {
    const { password, email, ...rest } = createuserDto;
    const canidate = await this.userRepository.findOne({ where: { email } });

    if (canidate) {
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
