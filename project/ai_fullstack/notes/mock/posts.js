import Mock from 'mockjs';

const categories = ['前端', '后端', '职场', '副业', '面试', '算法', 'AI', '工具', '经验'];

const posts = Mock.mock({
  'list|45': [
    {
      // 文章标题
      title: '@ctitle(8, 20)',
      // 作者
      author: '@cname',
      // 阅读量
      views: '@integer(100, 100000)',
      // 点赞数
      likes: '@integer(0, 500)',
      // 发布时间
      createdAt: '@datetime("yyyy-MM-dd HH:mm")',
      // 是否有图片（概率 60%）
      hasImage: '@boolean(true, 0.4)',
      // 图片链接（如果有的话）
      imageUrl: '@image(300x200, #f0f0f0, #999, "post", #fff)',
      // 标签/分类（随机选一个）
      category: () => Mock.Random.pick(categories),
      // 是否置顶（少量）
      isTop: '@boolean(false, 0.8)',
      // 内容摘要（前 50 字左右）
      excerpt: '@cparagraph(1, 2)',
      // 是否有评论（用于 UI 展示）
      comments: '@integer(0, 100)',
      // 唯一 ID
      id: '@increment(1)'
    }
  ]
}).list;


export default [
  // {
  //   url: '/api/posts',
  //   method: 'get',
  //   response: (req, res) => {
  //     return {
  //       code: 200,
  //       msg: 'success',
  //       data: posts,
  //     }
  //   }
  // }
  {
    url: '/api/posts',
    method: 'get',
    response: ({ query }, res) => {
      const { page = '1', pageSize = '10' } = query;
      // 转换为数字
      const currentPage = parseInt(page, 10);
      const size = parseInt(pageSize, 10);
      // 验证参数
      if (isNaN(currentPage) || isNaN(size) || currentPage < 1 || size < 1) {
        return {
          code: 400,
          msg: 'Invalid page or pageSize',
          data: null
        };
      }

      // 计算分页
      const total = posts.length;
      const start = (currentPage - 1) * size;
      const end = start + size;
      const paginatedData = posts.slice(start, end);

      return {
        code: 200,
        msg: 'success',
        data: {
          list: paginatedData,
          pagination: {
            current: currentPage,
            pageSize: size,
            total,
            totalPage: Math.ceil(total / size)
          }
        }
      };
    }
  }
]