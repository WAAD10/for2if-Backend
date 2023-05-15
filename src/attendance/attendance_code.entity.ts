import { StudyTable } from "src/study/study_table.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
