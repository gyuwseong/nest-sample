import { PartialType } from '@nestjs/mapped-types';
import { MaxLength } from 'class-validator';

export class CreateTweetDto {
  @MaxLength(200)
  tweet: string;
}

export class UpdateTweetDto extends PartialType(CreateTweetDto) {}
