import { UserTable } from 'src/auth/user_table.entity';
import { BoardCategory } from '../board_category.entity';
import { BoardImage } from '../board_image.entity';

export class CreateBoardDto {
  board_title: string;
  board_category: BoardCategory;
  board_content: string;
  user: UserTable;
  board_images: BoardImage[];
}
