import { Controller, Get, Post } from '@nestjs/common';
import { StudyTable } from './study_table.entity';
import { StudyTableRepository } from './study_table.repository';
import { StudyDto } from './dto/study.dto';

@Controller('study')
export class StudyTableController {
  constructor(private studyTableRepository: StudyTableRepository) {}

  @Post('/')
  async createStudy(studyDto: StudyDto) {
    await this.studyTableRepository
      .createQueryBuilder()
      .insert()
      .into(StudyTable)
      .values([
        {
          study_date: studyDto.study_date,
          study_name: studyDto.study_name,
          study_image: studyDto.study_image,
        },
      ])
      .execute();

    return {
      success: 'true',
    };
  }

  @Get('/')
  async getAllStudy(): Promise<{ study: StudyTable[] }> {
    const query = this.studyTableRepository.createQueryBuilder('study_table');
    const study_list: StudyTable[] = await query.getMany();
    const ret = { study: study_list };
    return ret;
  }
}
