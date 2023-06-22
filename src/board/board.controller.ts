/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// import { Board } from './board_status.enum';
import { BoardsService } from './board.service';
import { BoardTable } from './board_table.entity';
import { CreateBoardDto } from './dto/create_board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardsService: BoardsService) {}

  @Get('/v1/board?')
  getBoardById(@Param('id') id: number): Promise<BoardTable> {
    return this.boardsService.getBoardById(id);
  }

  @Post('/v1/board')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardTable>{
	return this.boardsService.createBoard(createBoardDto);
  }

  @Put('v1/board/:id')


  @Delete('v1/board/:id')

  @Get('/v1/board')
  getAllBoards(): Promise<Board[]>{
    return this.boardsService.getAllBoards();
  }
}