import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BoardCategoryRepository,
  BoardImageRepository,
  BoardTableRepository,
} from './board.repository';
import { BoardTable } from './board_table.entity';
import { CreateBoardDto } from './dto/create_board.dto';
import { ModifyBoardDto } from './dto/modify_board.dto';
import { DeleteBoardDto } from './dto/delete_board.dte';

@Injectable()
export class BoardsService {
  constructor(
    private boardCategoryRepository: BoardCategoryRepository,
    private boardImageRepository: BoardImageRepository,
    private boardTableRepository: BoardTableRepository,
  ) {}

  async getAllBoards(): Promise<BoardTable[]> {
    return this.boardTableRepository.find();
  }

  async getBoardById(id: number): Promise<BoardTable> {
    const found = await this.boardTableRepository.findOneBy({ board_id: id });

    if (!found) {
      throw new NotFoundException(`Can't find Borad with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardTable> {
    const { board_title, board_category, board_content, user, board_images } =
      createBoardDto;
    if (
      board_category.board_category_id == 0 &&
      user.user_type.user_type_id != 0
    ) {
      //카테고리 0이 공지사항, 유저 타입 0이 관리자라고 가정
      alert('공지사항은 관리자만 작성할 수 있습니다');
      return;
    }
    const board = this.boardTableRepository.create({
      board_title,
      board_date: Date(),
      board_category,
      board_content,
      user,
      board_images,
    });
    await this.boardTableRepository.save(board);
    return board;
  }

  async modifyBoard(modifyBoardDto: ModifyBoardDto): Promise<BoardTable> {
    const {
      board_id,
      requesting_user,
      board_category,
      board_title,
      board_content,
      board_images,
    } = modifyBoardDto;
    const board = await this.getBoardById(board_id);
    if (
      board_category.board_category_id == 0 &&
      requesting_user.user_type.user_type_id != 0
    ) {
      //카테고리 0이 공지사항, 유저 타입 0이 관리자라고 가정
      alert('공지사항은 관리자만 작성할 수 있습니다');
      return;
    }
    if (board.user.user_id != requesting_user.user_id) {
      // 작성자와 변경을 시도하려 하는 사람이 다를 경우
      alert('작성자만 수정할 수 있습니다');
      return;
    }

    board.board_category = board_category;
    board.board_title = board_title;
    board.board_content = board_content;
    board.board_images = board_images;

    await this.boardTableRepository.save(board);
    return board;
  }

  async deleteBoard(deleteBoardDto: DeleteBoardDto): Promise<void> {
    const { board_id, requesting_user } = deleteBoardDto;
    const board = await this.getBoardById(board_id);
    if (board.user.user_id != requesting_user.user_id) {
      // 작성자와 삭제를 시도하려 하는 사람이 다를 경우
      alert('작성자만 삭제할 수 있습니다');
      return;
    }
    const result = await this.boardTableRepository.delete(board_id);
    if (result.affected == 0) {
      throw new NotFoundException(`No board found with id ${board_id}`);
    }
  }
}
