import { Body, Controller, Get, Logger, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { UserTable } from "src/auth/user_table.entity";
import { BoardTable } from "src/board/board_table.entity";
import { CommentTable } from "./comment_table.entity";
import { CommentTableService } from "./comment_table.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('comment')
export class CommentTableController {
    private logger = new Logger('CommentTableController');
    constructor(private commentTableService : CommentTableService) {}

    @Get('/user/:id')
    findAllByUserID(user_id : string) :  Promise<CommentTable[]> {
        return this.commentTableService.findAllByUserID(user_id);
    }

    @Get('/board/:id')
    findAllByBoardID(@Param('id') board_id : number) :  Promise<CommentTable[]> {
        return this.commentTableService.findAllByBoardID(board_id);
    }

    @Post('/board/:id')
    async createComment(
        @Param('id') board_id : number,
        @Body() createCommentDto : CreateCommentDto //,
        //@GetUser() user : UserTable
    ) : Promise<void> {
        const board = await this.getBoardTableObjectByBoardId(board_id); // board_id를 사용하여 BoardTable객체 가져오는 코드 사용해야 함
        this.logger.verbose(`User ${user.user_id} creating a new comment. Payload : ${JSON.stringify(createCommentDto)}`)
        return this.commentTableService.createComment(createCommentDto, user, board);
    }

    @Put('/:comment_id')
    async editComment(
        @Param('comment_id') comment_id : number,
        @Body() createCommentDto : CreateCommentDto
        //@GetUser() user : UserTable
    ) : Promise<void> {
        const comment_user = (await this.commentTableService.getCommentById(comment_id)).user;
        if(comment_user !== user) {
            throw new UnauthorizedException(`You do not have permission to modify the comment with id \"${comment_id}\"`);
        }
        else {
            const comment_content = createCommentDto.comment_content;
            this.commentTableService.editComment(comment_id, comment_content);
        }
    }

    @Delete('/:comment_id')
    async deleteComment(
        @Param('comment_id') comment_id : number,
        //@GetUser() user : UserTable
    ) : Promise<void> {
        const comment_user = (await this.commentTableService.getCommentById(comment_id)).user;
        if(comment_user !== user) {
            throw new UnauthorizedException(`You do not have permission to delete the comment with id \"${comment_id}\"`);
        }
        else {
            this.commentTableService.deleteComment(comment_id);
        }
    }

    async getBoardTableObjectByBoardId(board_id : number) : Promise<BoardTable> {
        const ret = new BoardTable; // @@@ 나중에 여기부분 보완 필요 
        return ret;
    }
}