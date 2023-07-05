import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTable } from "src/auth/user_table.entity";
import { BoardTable } from "src/board/board_table.entity";
import { Repository } from "typeorm";
import { CommentTable } from "./comment_table.entity";
import { CommentTableRepository } from "./comment_table.repository";
import { CommentTablePage } from "./comment_table_page";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentTableService {
    constructor(
        private readonly commentTableRepository : CommentTableRepository,
        @InjectRepository(UserTable)
        private readonly userRepository: Repository<UserTable>,
    ) {}

    // 게시글에 달린 댓글 하나 생성
    createComment(createCommentDto : CreateCommentDto, user : UserTable, board: BoardTable) : Promise<CommentTable> {
        return this.commentTableRepository.createComment(createCommentDto, user, board);
    }

    async getCommentById(comment_id : number) : Promise <CommentTable> {
        const found = await this.commentTableRepository.findOneBy({comment_id});
        return found;
    }

    async IsThisUserNotOwnerOfComment(comment_id : number, user : UserTable) : Promise <boolean> {
        //const found = await this.commentTableRepository.findOneBy({comment_id, });
        const query = await this.commentTableRepository.createQueryBuilder('commenttable');
        const ret   = await query.where("commenttable.comment_id = :comment_id", {comment_id}).andWhere("commenttable.userUserId = :userId", {userId : user.user_id}).getMany();
        return ret.length===0;
    }

    // Put : 댓글 가져오기
    // Board에 달린 댓글들 모두 보여주기 
    async findAllByBoardID( board_id : number, page : number) : Promise<CommentTablePage> {
        const PAGE_SIZE : number = 5;
        const query = await this.commentTableRepository.createQueryBuilder('commenttable');
        const count : number = await query.where("commenttable.boardBoardId = :board_id", {board_id : board_id})
                                          .getCount();
        // 댓글이 없는 게시물의 1페이지를 요구했을 경우 빈배열 반환.
        if (page == 1 && count == 0) {
            return new CommentTablePage(0, []);
        }
        if (page <= 0 || page >= ~~(count/page) + 1) // 참고 : bitwise not연산자 두 개를 연속해서 사용할 시 C언어에서의 정수나누기와 동일한 효과를 얻는다(소수점 절삭)
        {  
            // 존재하지 않는 페이지를 찾으려고 시도함
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 페이지입니다."
            }, HttpStatus.BAD_REQUEST)

        }
        const skip = (page-1) * PAGE_SIZE;
        const comments : CommentTable[] = await query.where("commenttable.boardBoardId = :board_id", {board_id : board_id})
                                                     .offset(skip)
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

    async getUserByRequest(arg_req) : Promise<UserTable> {
        try{
            const ret_user : UserTable = await this.userRepository.findOne({
                where: { user_id: arg_req.user.uid }
            })
            return ret_user;
        }
        catch {
            return undefined;
        }
    }
}


