import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = await this.usersService.findOne(jwtPayload.sub);

    if (!user) {
      throw UnauthorizedException;
    }

    return user;
  }
}
