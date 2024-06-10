import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/common/crypt/bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env } from 'src/env';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get(env.jwt.secretKey),
          signOptions: {
            expiresIn: Number(configService.get(env.jwt.expirationTime)),
          },
        };
      },
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BcryptService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
