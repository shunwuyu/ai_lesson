/**
 * 查询片断
 */
export const sqlFragment = {
    user: `
      JSON_OBJECT(
        'id', user.id,
        'name', user.name,
        'avatar', IF(COUNT(avatar.id), 1, null)
      ) as user
    `,
    leftJoinUser: `
      LEFT JOIN user
        ON user.id = post.userId
      LEFT JOIN avatar
        ON user.id = avatar.userId
    `,
    totalComments: `
    (
      SELECT
        COUNT(comment.id)
      FROM
        comment
      WHERE
        comment.postId = post.id
    ) as totalComments
  `,
//   CAST 用于将一个字符串转换为 JSON 类型
  file: `
    CAST(
      IF(
        COUNT(file.id),
        GROUP_CONCAT(
          DISTINCT JSON_OBJECT(
            'id', file.id,
            'width', file.width,
            'height', file.height
          )
        ),
        NULL
      ) AS JSON
    ) AS file
  `,
  innerJoinOneFile: `
    INNER JOIN LATERAL (
      SELECT *
      FROM file
      WHERE file.postId = post.id
      ORDER BY file.id DESC
      LIMIT 1
    ) AS file ON post.id = file.postId
  `,
  tags: `
    CAST(
      IF(
        COUNT(tag.id),
        CONCAT(
          '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', tag.id,
                'name', tag.name
              )
            ),
          ']'
        ),
        NULL
      ) AS JSON
    ) AS tags
  `,
  leftJoinTag: `
    LEFT JOIN
      post_tag ON post_tag.postId = post.id
    LEFT JOIN
      tag ON post_tag.tagId = tag.id
  `,
}