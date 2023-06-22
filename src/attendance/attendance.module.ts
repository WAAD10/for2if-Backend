import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceCode } from './attendance_code.entity'
import { Attendance } from './attendance.entity'
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { AttendanceCodeRepository } from "./attendance_code.repository";
import { AttendanceRepository } from "./attendance.repository";


@Module({
    imports : [
        TypeOrmModule.forFeature([AttendanceCode, Attendance])
    ],
    providers : [AttendanceService, AttendanceCodeRepository, AttendanceRepository],
    controllers : [AttendanceController],
    exports : [AttendanceCodeRepository, AttendanceRepository],
})
export class AttendanceModule {}