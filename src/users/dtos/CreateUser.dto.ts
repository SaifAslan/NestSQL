import { IsNotEmpty } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
