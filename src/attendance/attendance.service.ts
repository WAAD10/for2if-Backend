import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserTable } from "src/auth/user_table.entity";
import { StudyTable } from "src/study/study_table.entity";
import { StudyTableRepository } from "src/study/study_table.repository";
import { Repository } from "typeorm";
import { Attendance } from "./attendance.entity";
import { AttendanceRepository } from "./attendance.repository";
import { AttendanceCode } from "./attendance_code.entity";
import { AttendanceCodeRepository } from "./attendance_code.repository";


@Injectable() 
export class AttendanceService 
{
    constructor(
        private readonly attendanceCodeRepository : AttendanceCodeRepository,
        private readonly attendanceRepository : AttendanceRepository,
        private readonly studyRepository : StudyTableRepository
    ) {}

    // 출석코드 생성. 이미 존재한다면 존재하는 출석코드 가져오기
    async createAttendanceCode(study : StudyTable, expire_minutes : number) : Promise<AttendanceCode> {
        return this.attendanceCodeRepository.createAttendanceCode(study, expire_minutes);
    }

    // 출석 마감하기 : 해당 스터디의 출석코드 정보 삭제 (없으면 에러발생)
    async deleteAttendanceCode(study : StudyTable) : Promise<boolean> {
        const ret = await this.attendanceCodeRepository.deleteAttendanceCode(study);
        return ret;
    }

    // 출석정보 만들기
    async makeAttendance(user : UserTable, study : StudyTable) : Promise<Attendance> {
        return this.attendanceRepository.makeAttendance(study, user);
    }

    isExpiredNow(expire_time : string) : boolean {
        return this.attendanceCodeRepository.isExpiredNow(expire_time);
    }

    async findAllCodesByStudy(study : StudyTable) : Promise<AttendanceCode[]> {
        const codes = await this.attendanceCodeRepository.findAllByStudy(study);
        return codes;
    }



    // 출석정보 들고오기 (스터디랑 유저정보 받아서 뭐시기)
    async getAllAttendances(user : UserTable) : Promise<Attendance[]> {
        return this.attendanceRepository.getAllAttendances(user);
    }

    async getStudyById(studyId : number) : Promise<StudyTable> {
        const query = this.studyRepository.createQueryBuilder("studytable");
        const ret = await query.where("studytable.study_id = :studyId", {studyId}).getOne();
        return ret;
    }
}