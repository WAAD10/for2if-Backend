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
          study_date: '2023-6-22',
          study_name: '2023-1 해커톤',
          study_image:
            'https://github.com/WAAD10/for2if-frontend/assets/47862506/12c4340b-aeeb-46a8-b6e5-3c39be85d7c7',
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
