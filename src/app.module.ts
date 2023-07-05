import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { BoardModule } from './board/board.module';
import { NftModule } from './nft/nft.module';
import { StudyTableModule } from './study/study_table.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    BoardModule,
    NftModule,
    StudyTableModule,
    AttendanceModule,
  ],
})
export class AppModule {}
