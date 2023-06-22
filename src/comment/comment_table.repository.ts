import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CommentTable } from "./comment_table.entity";
import { BoardTable } from "src/board/board_table.entity";
import { UserTable } from "src/auth/user_table.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentTableRepository extends Repository<CommentTable> {
    constructor(
        @InjectRepository(CommentTable)
        private readonly repository: Repository<CommentTable>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    // 댓글 하나 생성
    async createComment (createCommentDto : CreateCommentDto, user : UserTable, board: BoardTable) : Promise<CommentTable> {
        const {comment_content} = createCommentDto;
        const comment_date = this.getCurrentDateTime();
        const comment = this.create({
            user,
            board,
            comment_date,
            comment_content
        })
        await this.save(comment);
        return comment;
    }

    // 현재 시간을 "2023-05-28 17:07" 같은 형식으로 반환해주는 함수
    private getCurrentDateTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return currentDateTime;
    }
}