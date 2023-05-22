import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';

@Controller('attend')
export class AttendanceController {
  constructor(private AttendanceService: AttendanceService) {}

  @Get('/')
  getHello() {
    return this.AttendanceService.getHello();
  }

  @Post('/')
  // AuthGaurd
  attendance(@Body() attendanceDto: AttendanceDto): Promise<string> {
    return this.AttendanceService.attendance(attendanceDto);
  }
}
