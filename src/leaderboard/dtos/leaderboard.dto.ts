import { ApiProperty } from '@nestjs/swagger';
import { RecordDto } from './record.dto';

export class LeaderboardDto {
  @ApiProperty({
    type: [RecordDto],
  })
  data: RecordDto[];

  constructor(leaderboardDto: Partial<LeaderboardDto>) {
    Object.assign(this, leaderboardDto);
  }
}
