import { Controller, Get } from "@nestjs/common";
import { StudyTable } from "./study_table.entity";
import { StudyTableRepository } from "./study_table.repository";



@Controller('study')
export class StudyTableController {
    constructor(
        private studyTableRepository : StudyTableRepository
    ) {}


    @Get('/')
    async getAllStudy(
    ) : Promise<{study:StudyTable[]}> {
        const query = this.studyTableRepository.createQueryBuilder('study_table');
        const study_list : StudyTable[] = await query.getMany();
        const ret = {study : study_list};
        return ret;
    }

}