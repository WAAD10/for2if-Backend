import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';

@Controller('attend')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('/')
  @UseGuards(AuthGuard())
  attendance(@Body() attendanceDto: AttendanceDto): Promise<string> {
    return this.attendanceService.attendance(attendanceDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  attendanceDelete(@Param('id', ParseIntPipe) id: string): Promise<string> {
    return this.attendanceService.deleteAttendanceCode(id);
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  attendanceCreate(@Body() id: string): Promise<string> {
    return this.attendanceService.createAttendanceCode(id);
  }
}
