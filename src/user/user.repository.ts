import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from 'src/auth/auth.dto';
import { NotFoundUserError } from 'src/errors/user.error';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByIdOrNotFound(id: number): Promise<User> {
    return this.findOneBy({ id }).then((user: User) => {
      if (!user) throw new NotFoundException(NotFoundUserError);
      return user;
    });
  }

  async findOneByUsernameOrNotFound(username: string): Promise<User> {
    return this.findOneBy({ username }).then((user: User) => {
      if (!user) throw new NotFoundException(NotFoundUserError);
      return user;
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.findOneBy({ username });
  }
}
