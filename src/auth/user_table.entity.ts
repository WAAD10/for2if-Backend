import { Attendance } from 'src/attendance/attendance.entity';
import { BoardTable } from 'src/board/board_table.entity';
import { StudyTable } from 'src/study/study_table.entity';
import { CommentTable } from 'src/comment/comment_table.entity';
import {
  ManyToOne,
  OneToMany,
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { UserTypeEnum } from './user-type.enum';

@Entity()
export class UserTable extends BaseEntity {
  @PrimaryColumn({ type: 'character varying' })
  user_id: string;

  @Column({ type: 'character varying' })
  user_name: string;

    @ManyToOne(type => StudyTable, study_table => study_table.user_tables, {eager : false, nullable : true})
    study : StudyTable;

    @Column({type : 'character varying'})
    user_image : string;

    @Column()
    user_type : UserTypeEnum;

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
