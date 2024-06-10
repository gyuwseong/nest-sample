import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './configs/database/database.module';
import { TweetModule } from './tweet/tweet.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TweetModule,
    AuthModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {}
