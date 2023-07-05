import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTable } from "src/auth/user_table.entity";
import { StudyTable } from "src/study/study_table.entity";
import { Repository } from "typeorm";
import { Attendance } from "./attendance.entity";
import { AttendanceCode } from "./attendance_code.entity";


@Injectable()
export class AttendanceRepository extends Repository<Attendance> {
    constructor(
        @InjectRepository(Attendance)
        private readonly repository : Repository<Attendance>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    
    // 출석정보 하나 생성
    async makeAttendance(study : StudyTable, user : UserTable, attendance_code:AttendanceCode) : Promise<Attendance> {
        const attendance : Attendance = this.create({
            study : study,
            user : user,
            attendance_code : attendance_code
        })
        await this.save(attendance);
        return attendance;
    }

    // 해당 user 및 스터디의 출석코드정보 전부 들고오기
    async getAllAttendances(user : UserTable) : Promise<Attendance[]> {
        const query = this.createQueryBuilder('attendance');
        query.where("attendance.userUserId = :userId", { userId: user.user_id });
        const results = await query.getRawMany();
        return results;
    }
}