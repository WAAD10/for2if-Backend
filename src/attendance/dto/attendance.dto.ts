import { IsInt, IsNotEmpty } from "class-validator";

export class AttendanceDto {
    @IsInt()
    @IsNotEmpty()
    id : number;

    @IsInt()
    code? : number;
}