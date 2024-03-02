import { Body, Controller, Post, Get, HttpStatus } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { RecordDto } from './dtos/record.dto';
import { LeaderboardDto } from './dtos/leaderboard.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Leaderboard')
@Controller('/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('/createRecord')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been created',
  })
  createRecord(@Body() recordDto: RecordDto): Promise<void> {
    return this.leaderboardService.createRecord(recordDto);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Return the list of top 100 players, sorted by score in a descending manner.',
    type: LeaderboardDto,
  })
  getRecords(): Promise<LeaderboardDto> {
    return this.leaderboardService.getTop100Leaderboard();
  }
}
