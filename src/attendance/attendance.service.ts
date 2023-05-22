import { Injectable } from '@nestjs/common';
import { AttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  async getHello(): Promise<string> {
    return 'Hello 1!';
  }

  async attendance(attendanceDto: AttendanceDto): Promise<string> {
    const { id, code } = attendanceDto;
    // const user = await this.userRepository.findOne({
    //   where: { id },
    // });
    if (true) {
      // 첫 출석
    } else {
    }
    return 'hi';
  }
}
