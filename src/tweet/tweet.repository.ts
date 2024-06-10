import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { NotFoundTweetError } from 'src/errors/tweet.error';

@Injectable()
export class TweetRepository extends Repository<Tweet> {
  constructor(private dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }

  async findOneByIdOrNotFound(id: number): Promise<Tweet> {
    return this.findOneBy({ id }).then((post: Tweet) => {
      if (!post) throw new NotFoundException(NotFoundTweetError);
      return post;
    });
  }

  async findAll(): Promise<Tweet[]> {
    return this.find();
  }

  async findAllByUsername(username: string): Promise<Tweet[]> {
    const tweets = await this.find({
      where: {
        user: {
          username: username,
        },
      },
      relations: ['user'],
    });

    return tweets || [];
  }
}
