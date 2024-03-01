import { RecordDto } from './record.dto';

export class LeaderboardDto {
  data: RecordDto[];

  constructor(leaderboardDto: Partial<LeaderboardDto>) {
    Object.assign(this, leaderboardDto);
  }
}
