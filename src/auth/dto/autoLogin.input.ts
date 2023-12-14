import { IsNotEmpty } from 'class-validator';

export class AutoLoginInput {
  @IsNotEmpty()
  token: string;
}
