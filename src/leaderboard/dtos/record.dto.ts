import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class RecordDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  name: string;

  @IsInt()
  point: number;

  constructor(recordDto: Partial<RecordDto>) {
    Object.assign(this, recordDto);
  }
}
