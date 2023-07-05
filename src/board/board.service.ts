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
import { InjectRepository } from '@nestjs/typeorm';
import { UserTable } from 'src/auth/user_table.entity';
import { Repository } from 'typeorm';
import { BoardCategory } from './board_category.entity';
import { BoardImage } from './board_image.entity';

@Injectable()
export class BoardsService {
  constructor(
    private boardCategoryRepository: BoardCategoryRepository,
    private boardImageRepository: BoardImageRepository,
    private boardTableRepository: BoardTableRepository,
    @InjectRepository(UserTable)
    private readonly userTableRepository: Repository<UserTable>,
  ) {}

  // async getAllBoards(): Promise<BoardTable[]> {
  //   return this.boardTableRepository.find();
  // }


  async getBoardById(id: number): Promise<BoardTable> {
    const found: BoardTable = await this.boardTableRepository.findOneBy({
      board_id: id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }
  
  async getUserById(id: string): Promise<UserTable> {
    const found: UserTable = await this.userTableRepository.findOneBy({
      user_id: id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    return found;
  }

  async getBoardCategoryById(id: number): Promise<BoardCategory> {
    const found: BoardCategory = await this.boardCategoryRepository.findOneBy({
      board_category_id: id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find board category with id ${id}`);
    }

    return found;
  }
  // eslint-disable-next-line prettier/prettier
  async convertBoardImages(images: string[], board:BoardTable): Promise<BoardImage[]> {
    for (let i = 0; i < images.length; i++) {
      const image_temp = this.boardImageRepository.create({
        board,
        board_image: images[i],
      });
      await this.boardImageRepository.save(image_temp);
    }
    const query = this.boardImageRepository.createQueryBuilder('board_image');
    const boardimages: BoardImage[] = await query
      .where('board_image.boardBoardId = :boardId', { boardId: board.board_id })
      .getMany();
    return boardimages;
  }
  


  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardTable> {
    const { board_title, board_category_id, board_content, user_id, board_images } = createBoardDto;
    // 수정중
    // if (
    //   board_category_id == 0 &&
    //   user_i != 0
    // ) {
    //   //카테고리 0이 공지사항, 유저 타입 0이 관리자라고 가정
    //   alert('공지사항은 관리자만 작성할 수 있습니다');
    //   return;
    // }
    const user: UserTable = await this.getUserById(user_id);
    const today = new Date();
    const board = this.boardTableRepository.create({
      board_title,
      board_date:
      // SQL date formatting
        today.getFullYear() +
      '-' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
      '-' + ( (today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()) ),
      board_category: await this.getBoardCategoryById(board_category_id),
      board_content,
      user,
      board_images: [],
      is_deleted : false
    });
    await this.boardTableRepository.save(board);
    const board_again : BoardTable = await this.boardTableRepository.createQueryBuilder('board_table')
    .where('board_table.userUserId = :userId', {userId : user.user_id})
    .orderBy("board_id", "DESC")
    .getOne();
    const boardImages: BoardImage[] = await this.convertBoardImages(board_images, board_again);
    board_again.board_images = boardImages;
    await this.boardTableRepository.save(board_again);
    return board_again;
  }


  // async modifyBoard(modifyBoardDto: ModifyBoardDto): Promise<BoardTable> {
  //   const {
  //     board_id,
  //     requesting_user,
  //     board_category,
  //     board_title,
  //     board_content,
  //     board_images,
  //   } = modifyBoardDto;
  //   const board = await this.getBoardById(board_id);
  //   if (
  //     board_category.board_category_id == 0 &&
  //     requesting_user.user_type.user_type_id != 0
  //   ) {
  //     //카테고리 0이 공지사항, 유저 타입 0이 관리자라고 가정
  //     alert('공지사항은 관리자만 작성할 수 있습니다');
  //     return;
  //   }
  //   if (board.user.user_id != requesting_user.user_id) {
  //     // 작성자와 변경을 시도하려 하는 사람이 다를 경우
  //     alert('작성자만 수정할 수 있습니다');
  //     return;
  //   }
  //   //board 정보 바꾸기
  //   board.board_category = board_category;
  //   board.board_title = board_title;
  //   board.board_content = board_content;
  //   board.board_images = board_images;

  //   await this.boardTableRepository.save(board);
  //   return board;
  // }


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
