import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { BoardTable } from './board_table.entity';

@Entity()
export class BoardImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  board_image_id: number;

  @ManyToOne((type) => BoardTable, (board_table) => board_table.board_images, {
    eager: false,
  })
  board: BoardTable;

  @Column({ type: 'character varying' })
  board_image: string;
}
