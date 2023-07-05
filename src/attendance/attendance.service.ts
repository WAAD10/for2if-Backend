import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        private readonly studyRepository : StudyTableRepository,
        @InjectRepository(UserTable)
        private readonly userRepository: Repository<UserTable>,
    ) {}

    // 출석코드 생성.
    async createAttendanceCode(study : StudyTable, expire_minutes : number) : Promise<AttendanceCode> {
        return this.attendanceCodeRepository.createAttendanceCode(study, expire_minutes);
    }

    // 출석 마감하기 : 해당 스터디의 출석코드 정보 삭제 (없으면 에러발생)
    async expireAttendanceCode(study : StudyTable) : Promise<boolean> {
        const ret : boolean = await this.attendanceCodeRepository.expireAttendanceCodeByStudy(study);
        return ret;
    }

    // 출석정보 만들기
    async makeAttendance(user : UserTable, study : StudyTable) : Promise<Attendance> {
        const attendance_code : AttendanceCode = await this.getTheLatestCodeByStudy(study);
        return this.attendanceRepository.makeAttendance(study, user, attendance_code);
    }

    async isUserTryingToDuplicateTheAttendance(user : UserTable, study : StudyTable) : Promise<boolean> {
        const the_latest_attendance = await this.getTheLatestAttendanceByStudyAndUser(study, user);
        const the_latest_att_code   = await this.getTheLatestCodeByStudy(study);
        // 이미 지금의 출석코드로 생성된 출석정보가 존재한다면 (== 지금 출석 2번 이상 하려고 한다면)
        //console.log("the_latest_attendance", the_latest_attendance);
        //console.log("the_latest_att_code", the_latest_att_code);
        if(the_latest_attendance != null && the_latest_attendance.attendance_attendanceCodeAttendanceCodeId == the_latest_att_code.attendance_code_id) {
            return true;
        }
        return false;
    }

    isExpiredNow(expire_time : string) : boolean {
        return this.attendanceCodeRepository.isExpiredNow(expire_time);
    }

    // 스터디 받아서 가장 최근의 코드 반환
    async getTheLatestCodeByStudy(study : StudyTable) : Promise<AttendanceCode> {
        return await this.attendanceCodeRepository.getTheLatestCodeByStudy(study);
    }

    // 유저정보와 스터디 받아서 가장 최근에 생성된 출석정보 하나 반환
    async getTheLatestAttendanceByStudyAndUser(study : StudyTable, user : UserTable) : Promise<any> {
        const query = this.attendanceRepository.createQueryBuilder("attendance");
        const ret : Attendance = await query.where("attendance.studyStudyId = :studyId", {studyId : study.study_id})
                                            .andWhere("attendance.userUserId = :userId", {userId : user.user_id})
                                            .orderBy("attendance_id", "DESC")
                                            .getRawOne();
        return ret;
    }

    // 유저 객체의 study 정보가 null일 경우 study 객체 추가
    async addTheStudyToAnUserIfTheStudyIsNull(user : UserTable, study : StudyTable) : Promise<void> {
        if(user.study == null) {
            user.study = study;
            await this.userRepository.save(user);
        }
        return;
    }

    // 출석정보 들고오기 (유저정보 받아서 뭐시기)
    async getAllAttendances(user : UserTable) : Promise<Attendance[]> {
        return this.attendanceRepository.getAllAttendances(user);
    }

    async getStudyById(studyId : number) : Promise<StudyTable> {
        const query = this.studyRepository.createQueryBuilder("studytable");
        const ret = await query.where("studytable.study_id = :studyId", {studyId}).getOne();
        return ret;
    }

    async getUserByRequest(arg_req) : Promise<UserTable> {
        try{
            const ret_user : UserTable = await this.userRepository.findOne({
                where: { user_id: arg_req.user.uid }
            })
            return ret_user;
        }
        catch {
            return undefined;
        }
    }
}