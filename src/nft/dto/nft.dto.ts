import { IsNotEmpty } from 'class-validator';

export class NftDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  description: string;
}
