import { connection } from '../app/database/mysql';
import { sqlFragment } from './post.provider';
/**
 * 按 ID 调取内容
 */
export interface GetPostByIdOptions {
}
export const getPostById = async (
    postId: number,
    options: GetPostByIdOptions = {},
  ) => {
    // todo current
  
    // 准备查询
    const statement = `
      SELECT
        post.id,
        post.title,
        post.content,
        ${sqlFragment.user},
        ${sqlFragment.totalComments},
        ${sqlFragment.file},
        ${sqlFragment.tags}
      FROM post
      ${sqlFragment.leftJoinUser}
      ${sqlFragment.innerJoinOneFile}
      ${sqlFragment.leftJoinTag}
      WHERE post.id = ?
    `;

    // console.log(statement, postId)
  
    // 执行查询
    const [data] = await connection.promise().query(statement, postId);
    // console.log(data)
    // 没找到内容
    if (!data[0].id) {
      throw new Error('NOT_FOUND');
    }
  
    // 提供数据
    return data[0];
  };
  