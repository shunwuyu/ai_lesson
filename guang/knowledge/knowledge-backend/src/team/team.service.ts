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

  async listAccessibleTeamIds(userId: string): Promise<string[]> {
    // 成员表；负责人可能不在成员表，需单独查 kh_team.leader_id
    const [memberRows, led] = await Promise.all([
      this.memberRepo
        .createQueryBuilder('m')
        .select('m.team_id', 'teamId')
        .where('m.user_id = :userId', { userId })
        .getRawMany<{ teamId: string | number }>(),
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
      where: { id: In(ids), deleted: false },
      select: ['id', 'teamName'],
    });
    return teams.map((row) => String(row.id));
  }
}
