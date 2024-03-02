import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class RecordDto {
  @ApiProperty({
    description: 'The name of the player.',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    description: 'The score the player earned after the game.',
  })
  @IsInt()
  score: number;

  constructor(recordDto: Partial<RecordDto>) {
    Object.assign(this, recordDto);
  }
}
