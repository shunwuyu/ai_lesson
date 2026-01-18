import Mock from 'mockjs';

const categories = ['前端', '后端', '职场', '副业', '面试', '算法', 'AI', '工具', '经验'];

const posts = Mock.mock({
  'list|45': [
    {
      // 文章标题
      title: '@ctitle(8, 20)',
      brief: '@ctitle(20, 100)',
      // 阅读量
      totalComments: '@integer(1, 10)',
      // 点赞数
      totalLikes: '@integer(0, 500)',
      // 发布时间
      publishedAt: '@datetime("yyyy-MM-dd HH:mm")',
      user: {
        id: '@integer(1, 10)',
        name: '@ctitle(2, 3)',
        avatar: '@image(300x200, #f0f0f0, #999, "post", #fff)' 
      },  
      tags: () => Mock.Random.pick(categories, 2),
      thumbnail: '@image(300x200, #f0f0f0, #999, "post", #fff)',
      pics: [
        '@image(300x200, #f0f0f0, #999, "post", #fff)',
        '@image(300x200, #f0f0f0, #999, "post", #fff)',
        '@image(300x200, #f0f0f0, #999, "post", #fff)',
      ],  
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
        status: 200,
        msg: 'success',
        items: paginatedData,
        pagination: {
          current: currentPage,
          limit: size,
          total,
          totalPage: Math.ceil(total / size)
        }
        
      };
    }
  }
]