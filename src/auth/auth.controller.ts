import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/usr.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  signIn(@Body() userDto: UserDto): Promise<Object> {
    return this.authService.signIn(userDto);
  }

  @Get('/mentor/:id')
  giveMentorAuth(@Param('id') id: string) {
    return this.authService.giveMentorAuth(id);
  }

  @Get('/test')
  @UseGuards(AuthGuard)
  test(@Request() req) {
    console.log(req.user);
  }
}
