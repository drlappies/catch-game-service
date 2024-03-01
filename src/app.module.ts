import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import config from './config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
    }),
    LeaderboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
