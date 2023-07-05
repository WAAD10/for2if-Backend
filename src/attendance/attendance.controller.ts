import { Body, Controller, Delete, Get, Logger, Param, Post, UnauthorizedException } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { Attendance } from "./attendance.entity";
import { AttendanceCode } from "./attendance_code.entity";
import { UserTable } from "src/auth/user_table.entity";
import { UserTypeEnum } from "src/auth/user-type.enum";

@Controller('attend')
export class AttendanceController {
    private logger = new Logger('AttendanceController');
    // constructor(
    //     private attendanceService : AttendanceService) {}

    // // 출석하기 (Post)
    // @Post('/')
    // async makeAttendance (
    //     @Body('id') study_id : number,
    //     @Body('code') code : number,
    //     @GetUser() user : UserTable
    // ) : Promise<Attendance> {
    //     const study = await this.attendanceService.getStudyById(study_id);
    //     return this.attendanceService.makeAttendance(code, user, study);
    // }


    // // 출석코드 생성 (Post)
    // @Post('/create')
    // async createAttendanceCode(
    //     @Body('id') study_id : number,
    //     @GetUser() user // 유저 정보 받아서 권한 확인해야함
    // ) : Promise<AttendanceCode> {
    //     const study = await this.attendanceService.getStudyById(study_id);
    //     if(user.user_type != UserTypeEnum.MENTOR) {
    //         throw new UnauthorizedException(`You don't have permission to create code.`);
    //     }
    //     return this.attendanceService.createAttendanceCode(study, 5);
    // }

    // // 출석 마감하기 (Delete)
    // @Delete('/:id')
    // async deleteAttendanceCode(
    //     @Param('id') study_id : number,
    //     @GetUser() user 
    // ) : Promise<void> {
    //     const study = await this.attendanceService.getStudyById(study_id);
    //     if(user.user_type != UserTypeEnum.MENTOR) {
    //         throw new UnauthorizedException(`You don't have permission to create code.`);
    //     }
    //     return this.attendanceService.deleteAttendanceCode(study);
    // }

    // // 출석내역 불러오기 (Get)
    // @Get('/get')
    // async getAllAttendances(
    //     @GetUser() user // @@유저 정보 받아와야
    // ) : Promise<Attendance[]> {
    //     return this.attendanceService.getAllAttendances(user);
    // }
}