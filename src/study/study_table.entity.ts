import { AttendanceCode } from "src/attendance/attendance_code.entity";
import { Attendance } from "src/attendance/attendance.entity";
import { UserTable } from "src/auth/user_table.entity";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['study_name'])
export class StudyTable extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    study_id : number;

    @Column({type : 'character varying'})
    study_date : string;

    @Column({type : 'character varying'})
    study_name : string;

    @Column({type : 'character varying'})
    study_image : string;

    ///////////////////////////////////////////////////////////////////////////////////////////////

    @OneToMany(type => UserTable, user_table => user_table.study, {eager : true})
    user_tables : UserTable[];

    @OneToMany(type => Attendance, attendance => attendance.study, {eager : true})
    attendances : Attendance[];

    @OneToMany(type => AttendanceCode, attendance_code => attendance_code.study, {eager : true})
    attendance_codes : AttendanceCode[];
}