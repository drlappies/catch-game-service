import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { RecordDto } from './dtos/record.dto';
import { LeaderboardDto } from './dtos/leaderboard.dto';
import * as _ from 'lodash';

const LEADERBOARD_ZSET_KEY = 'leaderboard';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async createRecord({ name, point }: RecordDto): Promise<void> {
    await this.redis.zadd(LEADERBOARD_ZSET_KEY, point, name);
  }

  async getTop100Leaderboard(): Promise<LeaderboardDto> {
    const response = await this.redis.zrevrange(
      LEADERBOARD_ZSET_KEY,
      0,
      100,
      'WITHSCORES',
    );

    const recordDtos: RecordDto[] = _.chunk(response, 2).map(
      ([member, score]) =>
        new RecordDto({ name: member, point: parseInt(score) }),
    );

    return new LeaderboardDto({ data: recordDtos });
  }
}
