import { Body, Controller, Delete, Get, Logger, HttpCode, Param, Post, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { Attendance } from "./attendance.entity";
import { AttendanceCode } from "./attendance_code.entity";
import { GetUser } from "src/auth/get-user.decorator";
import { UserTable } from "src/auth/user_table.entity";
import { UserTypeEnum } from "src/auth/user-type.enum";
import { AttendanceDto } from "./dto/attendance.dto";

@Controller('attend')
export class AttendanceController {
    private logger = new Logger('AttendanceController');
    constructor(
        private attendanceService : AttendanceService) {}

    // 출석하기 (Post)
    @Post('/')
    @HttpCode(200)
    async makeAttendance (
        @Body() attendance_dto : AttendanceDto,
        @GetUser() user : UserTable
    ) : Promise<{ success }> {
        const {id, code} = attendance_dto;
        if(!this.isStringInteger(id) || !this.isStringInteger(code)){
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        const study = await this.attendanceService.getStudyById(id);
        if(study == null) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 스터디입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const codes : AttendanceCode[] = await this.attendanceService.findAllCodesByStudy(study);
        if(codes.length == 0 || this.attendanceService.isExpiredNow(codes[0].expire_time)) {
            throw new HttpException({
                errCode: 400,
                errMsg: "출석코드가 만료되었습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(code != codes[0].code) {
            throw new HttpException({
                errCode: 400,
                errMsg: "출석코드가 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        } 
        await this.attendanceService.makeAttendance(user, study);
        return { success : true };
    }


    // 출석코드 생성 (Post)
    @Post('/create')
    @HttpCode(200)
    async createAttendanceCode(
        @Body() attendance_dto : AttendanceDto,
        @GetUser() user // 유저 정보 받아서 권한 확인해야함
    ) : Promise<{ code }> {
        if(!this.isStringInteger(attendance_dto.id)){
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        if(user.user_type != UserTypeEnum.MENTOR) {
            throw new HttpException({
                errCode: 403,
                errMsg: "권한이 존재하지 않습니다."
            }, HttpStatus.FORBIDDEN);
        }
        const study = await this.attendanceService.getStudyById(attendance_dto.id);
        if(study == null) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 스터디입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const attendance_code = await this.attendanceService.createAttendanceCode(study, 5); 
        const ret = { code : attendance_code.code };
        return ret;
    }

    // 출석 마감하기 (Delete)
    @Delete('/:id')
    @HttpCode(200)
    async deleteAttendanceCode(
        @Param('id') study_id : number,
        @GetUser() user 
    ) : Promise<{ success }> {
        if(!this.isStringInteger(study_id)){
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        if(user.user_type != UserTypeEnum.MENTOR) {
            throw new HttpException({
                errCode: 403,
                errMsg: "권한이 존재하지 않습니다."
            }, HttpStatus.FORBIDDEN);
        }
        const study = await this.attendanceService.getStudyById(study_id);
        //console.log(study)
        if(study == null) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 스터디입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        // 삭제했는데 false가 반환된 경우 == 출석코드가 존재 안하는 경우
        if(!(await this.attendanceService.deleteAttendanceCode(study))){
            throw new HttpException({
                errCode: 400,
                errMsg: "생성된 출석코드가 없습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        return { success : true };
    }

    // 출석내역 불러오기 (Get)
    @Get('/')
    @HttpCode(200)
    async getAllAttendances(
        @GetUser() user
    ) : Promise<Attendance[]> {
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        return this.attendanceService.getAllAttendances(user);
    }

    private isStringInteger(arg_str) : boolean {
        const numbered : number = Number(arg_str);
        // 애초에 문자열이 number가 맞는지 확인
        if (isNaN(numbered)) {
            return false;
        }
        // number라면 정수인지 확인
        if(!Number.isInteger(numbered)) {
            return false;
        }
        return true;
    }
}