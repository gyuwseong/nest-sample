import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto, UpdateTweetDto } from './tweet.dto';
import { Tweet } from './tweet.entity';
import { User } from 'src/user/user.entity';
import { InvalidUserError } from 'src/errors/user.error';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}
  async create(user: User, createTweetDto: CreateTweetDto): Promise<Tweet> {
    const { tweet } = createTweetDto;
    const newTweet: Tweet = Tweet.create({
      userId: user.id,
      tweet,
    });
    return newTweet.save();
  }

  async update(
    id: number,
    user: User,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    const tweet: Tweet = await this.tweetRepository.findOneByIdOrNotFound(id);
    this.verifyUser(tweet.userId, user.id);
    tweet.updateTweet(updateTweetDto);
    return tweet.save();
  }

  async remove(id: number, user: User): Promise<Boolean> {
    const tweet: Tweet = await this.tweetRepository.findOneByIdOrNotFound(id);
    this.verifyUser(tweet.userId, user.id);
    return tweet.remove().then(() => true);
  }

  async findOne(id: number): Promise<Tweet> {
    return this.tweetRepository.findOneByIdOrNotFound(id);
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetRepository.findAll();
  }

  async findAllByUsername(username): Promise<Tweet[]> {
    return this.tweetRepository.findAllByUsername(username);
  }

  private verifyUser(tweetUserId: number, userId: number): void {
    if (tweetUserId !== userId) {
      throw new UnauthorizedException(InvalidUserError);
    }
  }
}
