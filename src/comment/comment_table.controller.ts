import { Body, Delete, Controller, Get, Logger, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { UserTable } from "src/auth/user_table.entity";
import { BoardsService } from "src/board/board.service";
import { BoardTable } from "src/board/board_table.entity";
import { CommentTable } from "./comment_table.entity";
import { CommentTablePage, CommentTableService } from "./comment_table.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('comment')
export class CommentTableController {
    private logger = new Logger('CommentTableController');
    constructor(
        private commentTableService : CommentTableService,
        private boardService : BoardsService
    ) {}

    /*
    @Get('/user/:id')
    findAllByUserID(user_id : string) :  Promise<CommentTable[]> {
        return this.commentTableService.findAllByUserID(user_id);
    }
    */

    @Get('/')
    findAllByBoardID(
        @Param('id') board_id : number,
        @Param('page') page : number
    ) :  Promise<CommentTablePage> {
        return this.commentTableService.findAllByBoardID(board_id, page);
    }

    // @Post('/board/:id')
    // async createComment(
    //     @Param('id') board_id : number,
    //     @Body() createCommentDto : CreateCommentDto,
    //     @GetUser() user : UserTable
    // ) : Promise<void> {
    //     const board = await this.getBoardTableObjectByBoardId(board_id); // board_id를 사용하여 BoardTable객체 가져오는 코드 사용해야 함
    //     this.logger.verbose(`User ${user.user_id} creating a new comment. Payload : ${JSON.stringify(createCommentDto)}`)
    //     this.commentTableService.createComment(createCommentDto, user, board);
    // }

    // @Put('/:id')
    // async editComment(
    //     @Param('id') comment_id : number,
    //     @Body() createCommentDto : CreateCommentDto,
    //     @GetUser() user : UserTable
    // ) : Promise<void> {
    //     const comment_user = (await this.commentTableService.getCommentById(comment_id)).user;
    //     if(comment_user !== user) {
    //         throw new UnauthorizedException(`You do not have permission to modify the comment with id \"${comment_id}\"`);
    //     }
    //     else {
    //         const comment_content = createCommentDto.comment_content;
    //         this.commentTableService.editComment(comment_id, comment_content);
    //     }
    // }

    // @Delete('/:id')
    // async deleteComment(
    //     @Param('id') comment_id : number,
    //     @GetUser() user : UserTable
    // ) : Promise<void> {
    //     const comment_user = (await this.commentTableService.getCommentById(comment_id)).user;
    //     if(comment_user !== user) {
    //         throw new UnauthorizedException(`You do not have permission to delete the comment with id \"${comment_id}\"`);
    //     }
    //     else {
    //         this.commentTableService.deleteComment(comment_id);
    //     }
    // }

    // async getBoardTableObjectByBoardId(board_id : number) : Promise<BoardTable> {
    //     const ret = await this.boardService.getBoardById(board_id);
    //     return ret;
    // }

    /*
    private filterXSS(cont : string) : string {
        let ret = cont;
        const to_table = [
            '&amp;','&lt;','&gt;','&#x27;','&quot;','&#40;','&#41;','&#x2F;','<br>'
        ]
        const from_table = [
            /&/g,/</g,/>/g,/\\/g,/\"/g,/\(/g,/\)/g,/\//g,/\n/g
        ]
        for(let i = 0; i < to_table.length; i++)
        {
            ret = ret.replace(from_table[i], to_table[i]);
        }
        return ret;
    }
    */
}