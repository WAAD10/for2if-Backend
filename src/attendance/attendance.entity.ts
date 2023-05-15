import { UserTable } from "src/auth/user_table.entity";
import { StudyTable } from "src/study/study_table.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance extends BaseEntity
{
    @PrimaryGeneratedColumn()
    attendance_id : number;

    @ManyToOne(type => StudyTable, study_table => study_table.attendances, {eager : false})
    study : StudyTable;

    @ManyToOne(type => UserTable, user_table => user_table.attendances, {eager : false})
    user : UserTable;
}