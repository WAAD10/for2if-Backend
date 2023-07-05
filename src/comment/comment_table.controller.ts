import { Body, Delete, Controller, Get, Param, Post, Put, Query, HttpException, HttpStatus, HttpCode, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserTypeEnum } from "src/auth/user-type.enum";
import { UserTable } from "src/auth/user_table.entity";
import { BoardTableRepository } from "src/board/board.repository";
import { BoardTable } from "src/board/board_table.entity";
import { CommentTableService } from "./comment_table.service";
import { CommentTablePage } from "./comment_table_page";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('comment')
export class CommentTableController {
    //private logger = new Logger('CommentTableController');
    constructor(
        private commentTableService : CommentTableService,
        private boardRepository : BoardTableRepository 
    ) {}


    @Get('/check')
    @UseGuards(AuthGuard)
    async checkMe(
        @Request() req
    ) : Promise<void> {
        const user : UserTable = await this.commentTableService.getUserByRequest(req);
        console.log(user);
    }


    // 댓글 가져오기
    @Get('/?')
    async findAllByBoardID(
        @Query('id') board_id : number,
        @Query('page') page : number
    ) :  Promise<CommentTablePage> {
        if(!this.isStringInteger(board_id) || !this.isStringInteger(page)){
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const board = await this.getBoardTableObjectByBoardId(board_id);
        if(board == null) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 게시물입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        return this.commentTableService.findAllByBoardID(board_id, page);
    }

    // 댓글 등록하기
    @Post('/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async createComment(
        @Param('id') board_id : number,
        @Body() createCommentDto : CreateCommentDto,
        @Request() req
    ) : Promise<{success}> {
        const user : UserTable = await this.commentTableService.getUserByRequest(req);
        if(!this.isStringInteger(board_id) || createCommentDto.comment_content === undefined){
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        const board = await this.getBoardTableObjectByBoardId(board_id);
        if (board == null) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 게시물입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        this.commentTableService.createComment(createCommentDto, user, board);
        return { success : true };
    }

    // 댓글 수정하기
    @Put('/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async editComment(
        @Param('id') comment_id : number,
        @Body() createCommentDto : CreateCommentDto,
        @Request() req
    ) : Promise<{success}> {
        const user : UserTable = await this.commentTableService.getUserByRequest(req);
        if (!this.isStringInteger(comment_id) || createCommentDto.comment_content === undefined) {
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const comment = (await this.commentTableService.getCommentById(comment_id));
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        if(!comment) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 댓글입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const is_owner : Boolean = !(await this.commentTableService.IsThisUserNotOwnerOfComment(comment_id, user));
        const can_edit : Boolean = (user.user_type == UserTypeEnum.MANAGE) || is_owner; // MANAGE이거나 작성자면 삭제 가능
        //console.log("user_uid:", user.user_id, "\nis owner : ", is_owner, "\nusertype: ", user.user_type,"\ncan_edit:", can_edit);
        if(!can_edit) {
            throw new HttpException({
                errCode: 400,
                errMsg: "자신의 댓글만 수정할 수 있습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const comment_content = createCommentDto.comment_content;
        this.commentTableService.editComment(comment_id, comment_content);
        return { success : true };
    }

    // 댓글 삭제하기
    @Delete('/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async deleteComment(
        @Param('id') comment_id : number,
        @Request() req
    ) : Promise<{success}> {
        const user : UserTable = await this.commentTableService.getUserByRequest(req);
        if (!this.isStringInteger(comment_id)) {
            throw new HttpException({
                errCode: 400,
                errMsg: "제출 양식이 틀렸습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        if(user == null) {
            throw new HttpException({
                errCode: 401,
                errMsg: "로그인을 해주세요."
            }, HttpStatus.UNAUTHORIZED);
        }
        const comment = (await this.commentTableService.getCommentById(comment_id));
        if(!comment) {
            throw new HttpException({
                errCode: 400,
                errMsg: "존재하지 않는 댓글입니다."
            }, HttpStatus.BAD_REQUEST);
        }
        const is_owner : Boolean = !(await this.commentTableService.IsThisUserNotOwnerOfComment(comment_id, user));
        const can_delete : Boolean = (user.user_type == UserTypeEnum.MANAGE) || is_owner; // MANAGE이거나 작성자면 삭제 가능
        if(!can_delete) {
            throw new HttpException({
                errCode: 400,
                errMsg: "자신의 댓글만 삭제할 수 있습니다."
            }, HttpStatus.BAD_REQUEST);
        }
        this.commentTableService.deleteComment(comment_id);
        return { success : true };
    }

    private async getBoardTableObjectByBoardId(board_id : number) : Promise<BoardTable> {
        //const ret = await this.boardService.getBoardById(board_id);
        const ret = await this.boardRepository.findOneBy({board_id});
        return ret;
    }

    private isStringInteger(arg_str) : boolean {
        const numbered : number = Number(arg_str);
        // 애초에 문자열이 number가 맞는지 확인
        if (isNaN(numbered)) {
            return false;
        }
        // number라면 정수인지 확인
        if(!Number.isInteger(numbered)) {
            return false;
        }
        // SQL의 integer형의 한계 (-2147483648 ~ +2147483647)를 벗어나는지 확인
        if(numbered >= +2147483648 || numbered <= -2147483649) {
            return false;
        }

        return true;
    }

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