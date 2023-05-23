import { Injectable } from '@nestjs/common';
import { AttendanceDto } from './dto/attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendanceService {
  // constructor(
  //   @InjectRepository(User)
  //   private userRepository: UserRepository,
  // ) {}

  async attendance(attendanceDto: AttendanceDto): Promise<string> {
    // const { id, code } = attendanceDto;
    // const user = await this.userRepository.findOne({
    //   where: { id },
    // });
    // if (!user) {
    //   // 첫 출석
    // } else {
    // }
    return 'hi';
  }

  async deleteAttendanceCode(id: string): Promise<string> {
    // delete code
    return 'hi';
  }

  async createAttendanceCode(id: string): Promise<string> {
    // create code
    return 'hi';
  }
}
