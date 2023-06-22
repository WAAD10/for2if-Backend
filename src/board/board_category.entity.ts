import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { BoardTable } from './board_table.entity';

@Entity()
export class BoardCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  board_category_id: number;

  @Column({ type: 'character varying' })
  board_category_name: string;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  @OneToMany((type) => BoardTable, (board_table) => board_table.board_category)
  board_tables: BoardTable[];
}
