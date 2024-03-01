import { IsString, IsInt } from 'class-validator';

export class RecordDto {
  @IsString()
  name: string;

  @IsInt()
  point: number;

  constructor(recordDto: Partial<RecordDto>) {
    Object.assign(this, recordDto);
  }
}
