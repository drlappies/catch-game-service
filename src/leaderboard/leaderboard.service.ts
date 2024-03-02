import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { RecordDto } from './dtos/record.dto';
import { LeaderboardDto } from './dtos/leaderboard.dto';
import { chunk } from 'lodash';

const LEADERBOARD_ZSET_KEY = 'leaderboard';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async createRecord({ name, score }: RecordDto): Promise<void> {
    const maxTime = new Date(8.64e15).getTime();
    const currentTime = Date.now();

    await this.redis.zadd(
      LEADERBOARD_ZSET_KEY,
      `${score}.${maxTime - currentTime}`,
      name,
    );
  }

  async getTop100Leaderboard(): Promise<LeaderboardDto> {
    const response = await this.redis.zrevrange(
      LEADERBOARD_ZSET_KEY,
      0,
      100,
      'WITHSCORES',
    );

    const recordDtos: RecordDto[] = chunk(response, 2).map(
      ([member, score]) =>
        new RecordDto({ name: member, score: parseInt(score) }),
    );

    return new LeaderboardDto({ data: recordDtos });
  }
}
