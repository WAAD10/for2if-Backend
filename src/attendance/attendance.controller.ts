import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { Attendance } from "./attendance.entity";
import { AttendanceCode } from "./attendance_code.entity";

@Controller('attend')
export class AttendanceController {
    private logger = new Logger('AttendanceController');
    constructor(private attendanceService : AttendanceService) {}

    // 출석하기 (Post)
    @Post('/')
    async makeAttendance (
        @Body('id') study_id : number,
        @Body('code') code : number
        //@GetUser() user : UserTable
    ) : Promise<Attendance> {
        // @@스터디 id로 가져오는거 함수 받아와야 함
        return this.attendanceService.makeAttendance(code, user, study);
    }


    // 출석코드 생성 (Post)
    @Post('/create')
    async createAttendanceCode(
        @Body('id') study_id : number
        //@GetUser() user // 유저 정보 받아서 권한 확인해야함
    ) : Promise<AttendanceCode> {
        // @@스터디 id로 가져오는거 함수 받아와야 함
        // @@스터디 정보 내 user랑 토큰으로 받은 user 비교해서 권한비교 ㄱㄱ
        return this.attendanceService.createAttendanceCode(study, 5);
    }

    // 출석 마감하기 (Delete)
    @Delete('/:id')
    async deleteAttendanceCode(
        @Param('id') study_id : number
        // @GetUser() // @@유저 정보 받아와야
    ) : Promise<void> {
        // @@스터디 id로 가져오는거 함수 받아와야 함
        // @@스터디 정보 내 user랑 토큰으로 받은 user 비교해서 권한비교 ㄱㄱ
        return this.attendanceService.deleteAttendanceCode(study);
    }

    // 출석내역 불러오기 (Get)
    @Get('/get')
    async getAllAttendances(
        // @GetUser() user // @@유저 정보 받아와야
    ) : Promise<Attendance[]> {
        return this.attendanceService.getAllAttendances(user);
    }
}