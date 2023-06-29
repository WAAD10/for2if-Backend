import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from "src/board/board.module";
import { CommentTableController } from "./comment_table.controller";
import { CommentTable } from "./comment_table.entity";
import { CommentTableRepository } from "./comment_table.repository";
import { CommentTableService } from "./comment_table.service";


@Module({
    imports : [
        TypeOrmModule.forFeature([CommentTable]),
        BoardModule
    ],
    providers : [CommentTableService, CommentTableRepository],
    controllers: [CommentTableController],
    exports : [CommentTableService, CommentTableRepository],
})
export class CommentTableModule {} 