import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyTableController } from "./study_table.controller";
import { StudyTable } from "./study_table.entity";
import { StudyTableRepository } from "./study_table.repository";

@Module({
    imports : [
        TypeOrmModule.forFeature([StudyTable]),
    ],
    providers : [StudyTableRepository, StudyTableController],
    controllers: [StudyTableController],
    exports : [StudyTableRepository,StudyTableController],
})
export class StudyTableModule {} 