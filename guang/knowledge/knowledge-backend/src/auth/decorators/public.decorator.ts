// `SetMetadata` 是 Nest 里用来给路由 / 控制器挂载自定义标签元数据
import { SetMetadata } from '@nestjs/common';
// 标记接口无需 JWT（login / register / refresh 等）
export const IS_PUBLIC_KEY = 'isPublic';

/** 标记接口无需 JWT（login / register / refresh 等） */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);