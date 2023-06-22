/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
// import { Board } from './board_status.enum';
import { BoardsService } from './board.service';
import { BoardTable } from './board_table.entity';
import { CreateBoardDto } from './dto/create_board.dto';
import { DeleteBoardDto } from './dto/delete_board.dte';
import { ModifyBoardDto } from './dto/modify_board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getBoardById(@Param('id') id: number): Promise<BoardTable> {
    return this.boardsService.getBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardTable>{
	return this.boardsService.createBoard(createBoardDto);
  }

  @Put('/:id')
  modifyBoard(@Body() modifyBoardDto: ModifyBoardDto): Promise<BoardTable>{
    return this.boardsService.modifyBoard(modifyBoardDto);
  }


  @Delete('/:id')
  deletBoard(@Body() deleteBoardDto: DeleteBoardDto): Promise<void>{
    return this.boardsService.deleteBoard(deleteBoardDto);
  }

  @Get('/')
  getAllBoards(): Promise<BoardTable[]>{
    return this.boardsService.getAllBoards();
  }
}