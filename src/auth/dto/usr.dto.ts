import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  wallet: string;
}
