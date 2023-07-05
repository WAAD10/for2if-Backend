import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceCode } from './attendance_code.entity'
import { Attendance } from './attendance.entity'
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { AttendanceCodeRepository } from "./attendance_code.repository";
import { AttendanceRepository } from "./attendance.repository";
import { StudyTableModule } from "src/study/study_table.module";
import { UserTable } from "src/auth/user_table.entity";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports : [
        TypeOrmModule.forFeature([AttendanceCode, Attendance, UserTable]),
        StudyTableModule,
        AuthModule
    ],
    providers : [AttendanceService, AttendanceCodeRepository, AttendanceRepository],
    controllers : [AttendanceController],
    exports : [AttendanceService, AttendanceCodeRepository, AttendanceRepository],
})
export class AttendanceModule {}