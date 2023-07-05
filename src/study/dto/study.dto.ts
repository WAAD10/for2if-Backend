import { IsNotEmpty } from 'class-validator';

export class StudyDto {
  @IsNotEmpty()
  study_date: string;

  @IsNotEmpty()
  study_name: string;

  @IsNotEmpty()
  study_image: string;
}
