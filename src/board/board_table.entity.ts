import { UserTable } from 'src/auth/user_table.entity';
import { CommentTable } from 'src/comment/comment_table.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { BoardCategory } from './board_category.entity';
import { BoardImage } from './board_image.entity';

@Entity()
export class BoardTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  board_id: number;

  @Column({ type: 'character varying' })
  board_title: string;

  @Column({ type: 'date' })
  board_date: string;

  @ManyToOne(
    (type) => BoardCategory,
    (board_category) => board_category.board_tables,
    { eager: false },
  )
  board_category: BoardCategory;

  @Column({ type: 'character varying' })
  board_content: string;

  @ManyToOne((type) => UserTable, (user_table) => user_table.board_tables, {
    eager: false,
  })
  user: UserTable;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  @OneToMany((type) => BoardImage, (board_image) => board_image.board, {
    eager: true,
  })
  board_images: BoardImage[];

  @OneToMany((type) => CommentTable, (comment_table) => comment_table.board, {
    eager: true,
  })
  comment_tables: CommentTable[];
}
