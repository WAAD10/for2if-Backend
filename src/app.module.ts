import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController, GoogleController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AuthController,
    GoogleController
  ],
  providers: [AuthService],
})

export class AppModule {}
