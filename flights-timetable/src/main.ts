import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from '@nestjs/microservices'
import { provider_host } from './config';


const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8085
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  await app.listen();
}
bootstrap();
