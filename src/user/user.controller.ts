import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOneByUsername(@Query('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Patch()
  async update(
    @Query('id') id: number,
    @Body() updateMemberDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateMemberDto);
  }
}
