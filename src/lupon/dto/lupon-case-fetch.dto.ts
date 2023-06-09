import { IsUUID } from 'class-validator';

export class LuponCaseFetchDto {
  @IsUUID()
  readonly id: string;
}
