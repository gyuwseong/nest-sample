import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto, LogInDto, SignUpDto } from './auth.dto';
import { User } from 'src/user/user.entity';
import { BcryptService } from 'src/common/crypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { InvalidPasswordError, SignUpFailError } from 'src/errors/user.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthCredentialsDto> {
    const { password, username } = signUpDto;
    const hashedPassword: string = await this.bcryptService.generateHash(
      password,
    );

    try {
      await this.userService.create({
        ...signUpDto,
        password: hashedPassword,
      });
      const accessToken: string = await this.createToken(username);
      return { accessToken, username };
    } catch {
      throw new InternalServerErrorException(SignUpFailError);
    }
  }

  async logIn(logInDto: LogInDto): Promise<AuthCredentialsDto> {
    const { username, password } = logInDto;
    const user: User = await this.userRepository.findOneByUsernameOrNotFound(
      username,
    );
    await this.verifyPassword(password, user.password);
    const payload: string = username;
    const accessToken: string = await this.createToken(payload);
    return { accessToken, username };
  }

  private async createToken(payload: string): Promise<string> {
    return this.jwtService.sign({ username: payload });
  }

  private async verifyPassword(
    loginPassword: string,
    userPassword: string,
  ): Promise<void> {
    const isValidPassword = await this.bcryptService.compare(
      loginPassword,
      userPassword,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException(InvalidPasswordError);
    }
  }
}
