import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, LogInDto, SignUpDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signUp')
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<AuthCredentialsDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/logIn')
  async signIn(
    @Body(ValidationPipe) logInDto: LogInDto,
  ): Promise<AuthCredentialsDto> {
    return this.authService.logIn(logInDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  async mypage(@GetUser() user: User) {
    return this.userService.findOneByUsername(user.username);
  }
}
