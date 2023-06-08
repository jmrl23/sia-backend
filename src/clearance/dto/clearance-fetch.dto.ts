import { IsUUID } from 'class-validator';

export class ClearanceFetchDto {
  @IsUUID()
  readonly id: string;
}
