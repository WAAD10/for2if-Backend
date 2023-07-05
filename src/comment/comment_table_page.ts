import { CommentTable } from "./comment_table.entity";

// "댓글 가져오기" 부분 페이징 처리를 위한 객체 정의
export class CommentTablePage {
    count : number;
    comments : CommentTable[];
    constructor(arg_count : number, arg_comments : CommentTable[]) {
        this.comments = arg_comments;
        this.count = arg_count;
    }
}
