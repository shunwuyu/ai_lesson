import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TeamEntity } from './entities/team.entity';
import { TeamMemberEntity } from './entities/team-member.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,
    @InjectRepository(TeamMemberEntity)
    private readonly memberRepo: Repository<TeamMemberEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  // 列出用户有权限的团队id
  async listAccessibleTeamIds(userId: string): Promise<string[]> {
    // 这段并行查两块数据：先从团队成员表，查出该用户加入
    // 的所有团队 ID；再从团队表，查出这个用户作为负责人的
    // 所有团队。Promise.all 一起并发查询，拿到结果后合并，
    // 就能得到用户有权限的全部团队。
    const [memberRows, led] = await Promise.all([
      // 成员表 是通过用户id找出用户加入的团队id， 
      // 一个成员可以属于多个团队
      this.memberRepo
        .createQueryBuilder('m')
        .select('m.team_id', 'teamId')
        .where('m.user_id = :userId', { userId })
        .getRawMany<{ teamId: string | number }>(),
      // 团队表 是通过用户id找出用户负责的团队id， 
      // 一个负责人可以负责多个团队
      this.teamRepo.find({
        where: { leaderId: userId, deleted: false },
        select: ['id'],
      }),
    ]);
    // bigint 可能是 string | number，统一成字符串再去重，避免同一团队出现两次
    const ids = [
      ...new Set([
        ...memberRows.map((row) => String(row.teamId)),
        ...led.map((row) => String(row.id)),
      ]),
    ];
    if (!ids.length) return [];
    // 成员记录可能仍指向已软删团队，再按 kh_team.deleted = false 过滤
    const teams = await this.teamRepo.find({
      // 过滤出未删除的团队
      where: { id: In(ids), deleted: false },
      select: ['id', 'teamName'],
    });
    return teams.map((row) => String(row.id));
  }
}
