import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTable } from './user_table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/usr.dto';
import { UserTypeEnum } from './user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserTable)
    private readonly userRepository: Repository<UserTable>,
    private jwtService: JwtService,
  ) {}

  async giveMentorAuth(uid: string) {
    const user = await this.userRepository
      .createQueryBuilder()
      .update(UserTable)
      .set({ user_type: UserTypeEnum.MENTOR })
      .where('user_id = :uid', { uid: uid })
      .execute();

    return user;
  }

  async signIn(userDto: UserDto): Promise<Object> {
    const uid = userDto.uid;
    const wallet = userDto.wallet;
    const user = await this.userRepository.findOne({
      where: { user_id: uid },
    });

    if (!user) {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserTable)
        .values([
          {
            user_id: uid,
            user_name: '',
            wallet_id: wallet,
            user_image: '',
            user_type: UserTypeEnum.COMMON,
          },
        ])
        .execute();
    }

    const user_type = user ? user.user_type : UserTypeEnum.COMMON;
    const payload = { uid: uid, type: user_type };
    const token = await this.jwtService.signAsync(payload);
    return { token: token };
  }
}
