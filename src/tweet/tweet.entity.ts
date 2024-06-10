import { User } from 'src/user/user.entity';
import { UpdateTweetDto } from './tweet.dto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 200 })
  tweet: string;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  updateTweet(dto: UpdateTweetDto): void {
    const { tweet } = dto;
    this.tweet = tweet;
  }
}
