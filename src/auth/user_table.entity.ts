import { Attendance } from 'src/attendance/attendance.entity';
import { BoardTable } from 'src/board/board_table.entity';
import { StudyTable } from 'src/study/study_table.entity';
import { CommentTable } from 'src/comment/comment_table.entity';
import { UserTypeTable } from './user_type_table.entity';
import {
  ManyToOne,
  OneToMany,
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
export class UserTable extends BaseEntity {
  @PrimaryColumn({ type: 'character varying' })
  user_id: string;

  @Column({ type: 'character varying' })
  user_name: string;

  @ManyToOne((type) => StudyTable, (study_table) => study_table.user_tables, {
    eager: false,
    nullable: true,
  })
  study: StudyTable;

  @Column({ type: 'character varying' })
  user_image: string;

  @ManyToOne(
    (type) => UserTypeTable,
    (user_type_table) => user_type_table.user_tables,
    { eager: false },
  )
  user_type: UserTypeTable;

  @Column({ type: 'character varying' })
  wallet_id: string;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  @OneToMany((type) => CommentTable, (comment_table) => comment_table.user, {
    eager: true,
  })
  comment_tables: CommentTable[];

  @OneToMany((type) => BoardTable, (board_table) => board_table.user, {
    eager: true,
  })
  board_tables: BoardTable[];

  @OneToMany((type) => Attendance, (attendance) => attendance.user, {
    eager: true,
  })
  attendances: Attendance[];
}
