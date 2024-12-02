import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import dbConfig from './configs/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password')
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
