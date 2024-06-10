import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto, UpdateTweetDto } from './tweet.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@GetUser() user: User, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(user, createTweetDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query('username') username: string) {
    if (username) {
      return this.tweetService.findAllByUsername(username);
    } else {
      return this.tweetService.findAll();
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async findOne(@Query('id') id: number) {
    return this.tweetService.findOne(id);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(
    @GetUser() user: User,
    @Query('id') id: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(id, user, updateTweetDto);
  }

  @Delete()
  @UseGuards(AuthGuard())
  async remove(@GetUser() user: User, @Query('id') id: number) {
    return this.tweetService.remove(id, user);
  }
}
