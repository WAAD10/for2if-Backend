import {
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
} from 'typeorm';
import { UserTable } from './user_table.entity';

@Entity()
@Unique(['user_type_name'])
export class UserTypeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_type_id: number;

  @Column({ type: 'character varying' })
  user_type_name: string;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  @OneToMany((type) => UserTable, (user_table) => user_table.user_type, {
    eager: true,
  })
  user_tables: UserTable[];
}
