import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserTable } from "src/auth/user_table.entity";
import { StudyTable } from "src/study/study_table.entity";
import { StudyTableRepository } from "src/study/study_table.repository";
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
    async deleteAttendanceCode(study : StudyTable) : Promise<void> {
        return this.attendanceCodeRepository.deleteAttendanceCode(study);
    }

    // 출석하기 (출석코드와 유저정보, 스터디정보 받아서 검사해서 뭐시기)
    //findAllbyStudy 사용해서 이래저래하세오
    async makeAttendance(arg_code : number, user : UserTable, study : StudyTable) : Promise<Attendance> {
        const codes = await this.attendanceCodeRepository.findAllByStudy(study);
        if(codes.length == 0 || codes[0].code != arg_code || this.attendanceCodeRepository.isExpiredNow(codes[0].expire_time)) {
            throw new UnauthorizedException(`Can't make attendance because code is expired or wrong.`);
        }
        else {
            // 출석정보 맞으면 하나 만들어서 던져줌
            return this.attendanceRepository.makeAttendance(study, user);
        }
    }

    // 출석정보 들고오기 (스터디랑 유저정보 받아서 뭐시기)
    async getAllAttendances(user : UserTable) : Promise<Attendance[]> {
        return this.attendanceRepository.getAllAttendances(user);
    }

    async getStudyById(studyId : number) : Promise<StudyTable> {
        const query = this.studyRepository.createQueryBuilder("studytable");
        query.where("studytable.study_id = :studyId", {studyId : studyId});
        const ret = await query.getOne();
        return ret;
    }
}