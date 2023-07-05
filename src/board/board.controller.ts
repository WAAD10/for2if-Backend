/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { Board } from './board_status.enum';
import { BoardsService } from './board.service';
import { BoardTable } from './board_table.entity';
import { CreateBoardDto } from './dto/create_board.dto';
import { DeleteBoardDto } from './dto/delete_board.dte';
import { ModifyBoardDto } from './dto/modify_board.dto';

@Controller('board')
export class BoardController {}
