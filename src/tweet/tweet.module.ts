import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TweetRepository } from './tweet.repository';
import { Tweet } from './tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetController],
  providers: [TweetService, TweetRepository],
})
export class TweetModule {}
