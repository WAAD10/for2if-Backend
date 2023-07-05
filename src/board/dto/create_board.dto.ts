import { UserTable } from 'src/auth/user_table.entity';
import { BoardCategory } from '../board_category.entity';
import { BoardImage } from '../board_image.entity';

export class CreateBoardDto {
  board_title: string;
  board_category_id: number;
  board_content: string;
  user_id: string;
  board_images: string[];
}
