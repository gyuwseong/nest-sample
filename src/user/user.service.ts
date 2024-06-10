import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignUpDto } from 'src/auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const { username, password, name, email, url } = signUpDto;
    const user: User = User.create({
      username,
      password,
      name,
      email,
      ...(url && { url }),
    });
    return user.save();
  }

  async update(userId: number, updateMemberDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userRepository.findOneByIdOrNotFound(userId);
    user.updateUser(updateMemberDto);
    return user.save();
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneByUsernameOrNotFound(username);
  }
}
