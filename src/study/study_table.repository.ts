import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudyTable } from "./study_table.entity";

@Injectable()
export class StudyTableRepository extends Repository<StudyTable> {
    constructor(
        @InjectRepository(StudyTable)
        private readonly repository: Repository<StudyTable>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}