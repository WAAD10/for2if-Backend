import { Injectable } from '@nestjs/common';
import { Boardstatus } from './board_status.enum';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BoardCategoryRepository,
  BoardImageRepository,
  BoardTableRepository,
} from './board.repository';
import { NotFoundError } from 'rxjs';
import { BoardTable } from './board_table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create_board.dto';
// import {   } from '@nestjs/typeorm/repository';

@Injectable()
export class BoardsService {
  constructor(
    private boardCategoryRepository: BoardCategoryRepository,
    private boardImageRepository: BoardImageRepository,
    private boardTableRepository: BoardTableRepository,
  ) {}
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards();
  }

  async getBoardById(id: number): Promise<BoardTable> {
    const found = await this.boardTableRepository.findOneBy({ board_id: id });

    if (!found) {
      throw new NotFoundError(`Can't find Borad with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardTable> {
    const { board_title, board_category, board_content, user, board_images } =
      createBoardDto;
    const board = this.boardTableRepository.create({
      board_title,
      board_category,
      board_content,
      user,
      board_images,
    });
  }
}
