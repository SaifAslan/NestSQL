import { IsNotEmpty } from 'class-validator';
import { IsNull } from 'typeorm';

export class UpdateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
