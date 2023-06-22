import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardsService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BoardCategoryRepository,
  BoardImageRepository,
  BoardTableRepository,
} from './board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardCategoryRepository,
      BoardImageRepository,
      BoardTableRepository,
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardsService],
})
export class BoardModule {}
