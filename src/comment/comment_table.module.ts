import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTable } from "./comment_table.entity";
import { CommentTableRepository } from "./comment_table.repository";
import { CommentTableService } from "./comment_table.service";


@Module({
    imports : [
        TypeOrmModule.forFeature([CommentTable])
    ],
    providers : [CommentTableService, CommentTableRepository],
    exports : [CommentTableRepository],
})
export class CommentTableModule {}