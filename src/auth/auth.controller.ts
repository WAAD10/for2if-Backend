import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/usr.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  signIn(@Body() userDto: UserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(userDto);
  }
}
