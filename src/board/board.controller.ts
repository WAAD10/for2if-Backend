/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post } from '@nestjs/common';
// import { Board } from './board_status.enum';
import { BoardsService } from './board.service';
import { BoardTable } from './board_table.entity';

@Controller('board')
export class BoardController {
  constructor(private boardsService: BoardsService) {}

  @Get('/v1/board?')
  getBoardById(@Param('id') id: number): Promise<BoardTable> {
    return this.boardsService.getBoardById(id);
  }

  @Post('/v1/board')
}
