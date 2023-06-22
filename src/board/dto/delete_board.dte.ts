import { UserTable } from 'src/auth/user_table.entity';

export class DeleteBoardDto {
  board_id: number;
  requesting_user: UserTable;
}
