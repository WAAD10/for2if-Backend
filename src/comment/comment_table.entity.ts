import { UserTable } from 'src/auth/user_table.entity';
import { BoardTable } from 'src/board/board_table.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommentTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne((type) => UserTable, (user_table) => user_table.comment_tables, {
    eager: false,
  })
  user: UserTable;

  @ManyToOne(
    (type) => BoardTable,
    (board_table) => board_table.comment_tables,
    { eager: false },
  )
  board: BoardTable;

  @Column({ type: 'character varying' })
  comment_date: string;

  @Column({ type: 'character varying' })
  comment_comment: string;
}
