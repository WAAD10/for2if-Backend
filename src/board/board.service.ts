import { Injectable } from '@nestjs/common';
import { Board, Boardstatus } from './board.model';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BoardCategoryRepository,
  BoardImageRepository,
  BoardTableRepository,
} from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    private boardCategoryRepository: BoardCategoryRepository,
    private boardImageRepository: BoardImageRepository,
    private boardTableRepository: BoardTableRepository,
  ){}
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards();
  }

  createBoard(createBoardDto: CreateBoardDto) { //All Dtos are temporary for now
    // const title = CreateBoardDto.title;
    // const description = CreateBoardDto.discription;
    // same with below
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title, // same with: title: title,
      description,
      status: Boardstatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  async getBoardById(id:number): Promise <Board> {
    const found = await this.boardTableRepository
  }
  
}
