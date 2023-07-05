import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attendance } from 'src/attendance/attendance.entity';
import { AttendanceCode } from 'src/attendance/attendance_code.entity';
import { UserTable } from 'src/auth/user_table.entity';
import { BoardCategory } from 'src/board/board_category.entity';
import { BoardImage } from 'src/board/board_image.entity';
import { BoardTable } from 'src/board/board_table.entity';
import { CommentTable } from 'src/comment/comment_table.entity';
import { Nft } from 'src/nft/nft.entity';
import { StudyTable } from 'src/study/study_table.entity';

const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  database: 'board-app',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  keepConnectionAlive: true,
  entities: [
    UserTable,
    Attendance,
    AttendanceCode,
    BoardCategory,
    BoardImage,
    BoardTable,
    CommentTable,
    StudyTable,
    Nft,
  ],
};

export default typeORMConfig;
