import { Body, Controller, Post, Get } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { RecordDto } from './dtos/record.dto';
import { LeaderboardDto } from './dtos/leaderboard.dto';

@Controller('/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('/createRecord')
  createRecord(@Body() { name, point }: RecordDto): Promise<void> {
    return this.leaderboardService.createRecord({ name, point });
  }

  @Get('/')
  getRecords(): Promise<LeaderboardDto> {
    return this.leaderboardService.getTop100Leaderboard();
  }
}
