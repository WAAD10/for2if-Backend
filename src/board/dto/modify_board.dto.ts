import { UserTable } from 'src/auth/user_table.entity';
import { BoardCategory } from '../board_category.entity';
import { BoardImage } from '../board_image.entity';

export class ModifyBoardDto {
  //여기 들어갈 requester_user_id를 제외한 값들은 모두 변경한 이후의 값들임(A값을 B로 바꾸고 싶으면 B의 값들이 여기 있어야 함)
  board_id: number;
  requesting_user: UserTable;
  board_title: string;
  board_category: BoardCategory;
  board_content: string;
  board_images: BoardImage[];
}
