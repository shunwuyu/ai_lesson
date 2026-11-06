/** JWT 校验后注入到 Controller 的当前用户 */
export interface AuthUser {
  userId: string;
  username: string;
  realName?: string | null;
  email?: string | null;
  avatar?: string | null;
  roles: string[];
  permissions: string[];
  /** 所在团队（含担任负责人的团队），用于文档可见性 */
  teamIds: string[];
}