import { Module, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// entities 是数据库表的映射实体，用来定义表结构，让 ORM 把类和数据库表一一对应。
import { User } from './users/entities/user.entity';
import { AiModule } from './ai/ai.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import {
  CronExpression,
  ScheduleModule,
  SchedulerRegistry
} from '@nestjs/schedule';
import { CronJob } from 'cron';
import { JobModule } from './job/job.module';
import { Job } from './job/entities/job.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    
    ServeStaticModule.forRoot({
      // __dirname 是当前文件的目录
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'hello',
      entities: [User, Job],
      connectorPackage: 'mysql2',
      logging: true,
      synchronize: true,
    }),
    UsersModule,
    AiModule,
    JobModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap{
  @Inject(SchedulerRegistry)
  schedulerRegistry: SchedulerRegistry;

  async onApplicationBootstrap() {
    // const job = new CronJob(CronExpression.EVERY_SECOND, () => {
    //   console.log('run job');
    // });
    // this.schedulerRegistry.addCronJob('job1', job);
    // job.start();
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteCronJob('job1');
    // }, 5000);
    
    // const intervalRef = setInterval(() => {
    //   console.log('run interval job');
    // }, 1000);
    // this.schedulerRegistry.addInterval('interval1', intervalRef);
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteInterval('interval1');
    // }, 5000);
    
    // const timeoutRef = setTimeout(() => {
    //   console.log('run timeout job');
    // }, 3000);
    // this.schedulerRegistry.addTimeout('timeout1', timeoutRef);
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteTimeout('timeout1');
    // }, 5000);
  }
}
