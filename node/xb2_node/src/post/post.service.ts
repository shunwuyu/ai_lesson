import { connection } from '../app/database/mysql';
export const getPostsTotalCount = async (options) => {
    let params = [];
    const statement = `
    SELECT
      COUNT(DISTINCT post.id) AS total
    FROM post
  `;
    const [data] = await connection.promise().query(statement, params);
    // 提供结果
    return data[0].total;
}

export const getPosts = async (options) => {
    // let params: Array<any> = [limit, offset];
    const statement = `
    SELECT
      post.id,
      post.title,
      post.content
    FROM post
    `
    const [data] = await connection.promise().query(statement, {});
    return data;
}