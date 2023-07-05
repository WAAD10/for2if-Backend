import { StudyTable } from "src/study/study_table.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendance } from "./attendance.entity";

@Entity()
export class AttendanceCode extends BaseEntity
{
    @PrimaryGeneratedColumn()
    attendance_code_id : number;

    @Column({type : 'integer'})
    code : number;

    @Column({type : 'character varying'})
    expire_time : string;

    @Column({type : 'character varying'})
    release_time : string;

    @ManyToOne(type=>StudyTable, study_table => study_table.attendance_codes, {eager : true})
    study : StudyTable;

    //////////////////////////////////

    @OneToMany((type) => Attendance, (attendance) => attendance.attendance_code, {
        eager: true,
      })
      attendances: Attendance[];
}
