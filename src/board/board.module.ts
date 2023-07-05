import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardsService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BoardCategoryRepository,
  BoardImageRepository,
  BoardTableRepository,
} from './board.repository';
import { BoardCategory } from './board_category.entity';
import { BoardImage } from './board_image.entity';
import { BoardTable } from './board_table.entity';
import { UserTable } from 'src/auth/user_table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardCategory,
      BoardImage,
      BoardTable,
      UserTable,
    ]),
  ],
  controllers: [BoardController],
  providers: [
    BoardsService,
    BoardCategoryRepository,
    BoardImageRepository,
    BoardTableRepository,
  ],
  exports: [BoardTableRepository],
})
export class BoardModule {}
