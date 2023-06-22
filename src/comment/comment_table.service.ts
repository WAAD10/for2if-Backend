import { Injectable, NotFoundException } from "@nestjs/common";
import { UserTable } from "src/auth/user_table.entity";
import { BoardTable } from "src/board/board_table.entity";
import { CommentTable } from "./comment_table.entity";
import { CommentTableRepository } from "./comment_table.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentTableService {
    constructor(
        private readonly commentTableRepository : CommentTableRepository
    ) {}

    // 게시글에 달린 댓글 하나 생성
    createComment(createCommentDto : CreateCommentDto, user : UserTable, board: BoardTable) : Promise<CommentTable> {
        return this.commentTableRepository.createComment(createCommentDto, user, board);
    }

    async getCommentById(comment_id : number) : Promise <CommentTable> {
        const found = await this.commentTableRepository.findOneBy({comment_id});
        if(!found) {
            throw new NotFoundException(`Can't find a comment with id ${comment_id}`);
        }
        return found;
    }

    // Board에 달린 댓글들 모두 보여주기 
    async findAllByBoardID( board_id : number, page : number) : Promise<CommentTablePage> {
        const PAGE_SIZE = 5;
        const query = await this.commentTableRepository.createQueryBuilder('commenttable');
        const count = await query.where("commenttable.boardId = :board_id", {board_id : board_id})
                                 .getCount();
        const skip = (page-1) * PAGE_SIZE;
        const comments = await query.where("commenttable.boardId = :board_id", {board_id : board_id})
                                    .offset(page)
                                    .limit(PAGE_SIZE)
                                    .getRawMany()        
        return new CommentTablePage(count, comments);
    }
    
    // 어떤 유저가 쓴 댓글 모두 보여주기
    async findAllByUserID(user_id: string) : Promise<CommentTable[]> {
        const query = this.commentTableRepository.createQueryBuilder('commenttable');
        query.where('commenttable.userId = :userId', {userId : user_id});
        const results = await query.getMany();
        return results;
    }

    // comment_id를 받아와서 댓글을 삭제하기
    async deleteComment(comment_id : number) : Promise<void> {
        const result = await this.commentTableRepository.delete(comment_id);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Comment with id ${comment_id}`);
        }
        console.log('result', result);
    }

    // 댓글 수정
    async editComment(comment_id : number, comment_content : string)  : Promise<void>{
        const comment = await this.getCommentById(comment_id);
        comment.comment_content = comment_content;
        await this.commentTableRepository.save(comment);
    }
}

export class CommentTablePage {
    count : number;
    comments : CommentTable[];
    constructor(arg_count : number, arg_comments : CommentTable[]) {
        this.comments = arg_comments;
        this.count = arg_count;
    }
}

