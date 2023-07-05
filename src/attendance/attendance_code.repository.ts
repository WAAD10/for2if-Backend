import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AttendanceCode } from "./attendance_code.entity";
import { StudyTable } from "src/study/study_table.entity"


@Injectable()
export class AttendanceCodeRepository extends Repository<AttendanceCode> {
    constructor(
        @InjectRepository(AttendanceCode)
        private readonly repository : Repository<AttendanceCode>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }


    // 조건 없이 그냥 DB에 출석코드 하나 생성시킴
    private async makeOneAttandanceCode (study : StudyTable, expire_minutes : number) : Promise<AttendanceCode> {
        const code = this.create({
            code : this.makeRandomCode(),
            expire_time : this.addMinutesToTimeString(this.getCurrentDateTime(), expire_minutes),
            release_time : this.getCurrentDateTime(),
            study : study
        });
        await this.save(code);
        return code;
    }

    // 스터디 정보 및 만료시간(분단위) 받아서 출석코드 생성
    async createAttendanceCode (study : StudyTable, expire_minutes : number) : Promise<AttendanceCode> {
        const code : AttendanceCode = await this.getTheLatestCodeByStudy(study);
        // 해당 study의 출석코드 중 5분 이내에 생성된 코드가 있는 경우
        // == 하나 들고온 해당 스터디의 가장 최근 출석코드가 만료된 경우
        // => 하나 생성해서 던져줌
        if(code == null || this.isExpiredNow(code.expire_time))
        {
            // 하나 생성해서 던져줌
            return this.makeOneAttandanceCode(study, expire_minutes);
        }
        // 위 경우가 아님 (해당 스터디의 출석코드가 생성된 적이 없거나 최근에 생성된 출석코드가 
        // 아직 유효한 출석정보가 하나 존재함
        // => 
        else 
        {
            // 존재하는 출석정보 하나 던져줌
            return code;
        }
    }

    // 해당 스터디의 출석코드 마감시키기 (이미 만료되었거나 출석코드 자체가 생성된 적이 없다면 false를, 그렇지 않다면 수정하고 true 반환)
    async expireAttendanceCodeByStudy(study : StudyTable) : Promise<boolean> {
        let code : AttendanceCode = await this.getTheLatestCodeByStudy(study);
        if (code == null || this.isExpiredNow(code.expire_time)) {
            return false;
        }
        code.expire_time = this.getCurrentDateTime();
        await this.save(code);
        return true;
    }

    // study의 출석코드 중 가장 최근의 것을 불러오기
    async getTheLatestCodeByStudy(study : StudyTable) : Promise<AttendanceCode> {
        const query = this.createQueryBuilder("attendance_code");
        const ret : AttendanceCode = await query.where("attendance_code.studyStudyId = :studyId", {studyId : study.study_id})
                                                .orderBy("release_time", "DESC")
                                                .getOne();
        return ret;
    }
    

    // min ~ max(inclusive) 사이의 정수 랜덤 값 반환
    private rand(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 1000 ~ 9999(inclusive) 사이의 정수 랜덤 값 반환
    private makeRandomCode() : number {
        return this.rand(1000, 9999);
    }

    // "2023-06-20 19:30:35" 형식의 문자열 2개(현재, 만료시간)를 받아서 만료시간 이후인지 아닌지 확인 
    private isExpired(now_time : string, expire_time : string) : boolean {
        // 주어진 문자열을 날짜 객체로 변환
        let date1 = new Date(now_time);
        let date2 = new Date(expire_time);
        
        // 두 날짜 사이의 시간 간격 계산 (밀리초 단위)
        let interval = (+date2) - (+date1);
        return interval < 0;
    }

    isExpiredNow(expire_time : string) : boolean {
        let now_time = this.getCurrentDateTime();
        return this.isExpired(now_time, expire_time);
    }

    // 현재 시간을 "2023-05-28 17:07" 같은 형식으로 반환해주는 함수
    private getCurrentDateTime(): string {
        const now = new Date();
        return this.formatDate(now);
    }

    // 두자리 숫자 문자열 앞에 0 포맷팅 
    private padZero(number : number) : string {
        return number.toString().padStart(2, '0');
    }

    // 날짜를 "%04d-%02d-%02d %02d:%02d:%02d" 형식으로 포맷팅하는 함수
    private formatDate(date : Date) : string {
        const year = date.getFullYear();
        const month = this.padZero(date.getMonth() + 1);
        const day = this.padZero(date.getDate());
        const hours = this.padZero(date.getHours());
        const minutes = this.padZero(date.getMinutes());
        const seconds = this.padZero(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // 시간 문자열에 분정보 더해서 다시 시간정보로 반환시킴
  private addMinutesToTimeString(timeString : string, minutes : number) : string {
    // 주어진 문자열을 날짜 객체로 변환
    const date = new Date(timeString);
    // 분을 더함
    date.setMinutes(date.getMinutes() + minutes);
    // 시간 문자열 포맷을 적용하여 반환
    const formattedTimeString = this.formatDate(date);
    return formattedTimeString;
  }
}