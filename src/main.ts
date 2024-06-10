import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

async function bootstrap() {
  const logger: Logger = new Logger();
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = 8080;
  const server: any = await app.listen(8080);
  const socketIO: Server = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  socketIO.on('connection', (socket: Socket) => {
    console.log('socket connected');
  });

  logger.log(`Application running on port ${port}`);
}
bootstrap();
