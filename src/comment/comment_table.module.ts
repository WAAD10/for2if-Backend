import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from "src/auth/auth.module";
import { UserTable } from "src/auth/user_table.entity";
import { BoardModule } from "src/board/board.module";
import { CommentTableController } from "./comment_table.controller";
import { CommentTable } from "./comment_table.entity";
import { CommentTableRepository } from "./comment_table.repository";
import { CommentTableService } from "./comment_table.service";


@Module({
    imports : [
        TypeOrmModule.forFeature([CommentTable, UserTable]),
        BoardModule,
        AuthModule
    ],
    providers : [CommentTableService, CommentTableRepository],
    controllers: [CommentTableController],
    exports : [CommentTableService, CommentTableRepository],
})
export class CommentTableModule {} 