import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { UserRoleEntity } from './user/entities/user-role.entity';
import { RoleEntity } from './user/entities/role.entity';
import { PermissionEntity } from './user/entities/permission.entity';
import { UserPermissionEntity } from './user/entities/user-permission.entity';
import { RolePermissionEntity } from './user/entities/role-permission.entity';
import { TeamModule } from './team/team.module';
import { TeamEntity } from './team/entities/team.entity';
import { TeamMemberEntity } from './team/entities/team-member.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('POSTGRES_HOST', 'localhost'),
        port: config.get<number>('POSTGRES_PORT', 5432),
        username: config.get<string>('POSTGRES_USER', 'user'),
        password: config.get<string>('POSTGRES_PASSWORD', '123456'),
        database: config.get<string>('POSTGRES_DB', 'knowledge_hub'),
        entities: [
          UserEntity,
          UserRoleEntity,
          RoleEntity,
          PermissionEntity,
          UserPermissionEntity,
          RolePermissionEntity,
          TeamEntity,
          TeamMemberEntity
        ],
        synchronize: false,
        logging: ['query', 'error']
      }),
    }),
    AuthModule,
    UserModule,
    TeamModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
