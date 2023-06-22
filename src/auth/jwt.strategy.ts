import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTable } from './user_table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserTable)
    private readonly userRepository: Repository<UserTable>,
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<UserTable> {
    const { uid } = payload;
    const user: UserTable = await this.userRepository.findOne({
      select: { user_id: uid },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
