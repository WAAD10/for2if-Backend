import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { BoardModule } from './board/board.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Attendance } from './attendance/attendance.entity';
import { AttendanceCode } from './attendance/attendance_code.entity';
import { UserTable } from './auth/user_table.entity';
import { UserTypeTable } from './auth/user_type_table.entity';
import { BoardCategory } from './board/board_category.entity';
import { BoardImage } from './board/board_image.entity';
import { BoardTable } from './board/board_table.entity';
import { CommentTable } from './comment/comment_table.entity';
import { typeORMConfig } from './config/typeorm.config';
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
