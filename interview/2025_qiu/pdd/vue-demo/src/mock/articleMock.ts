import { MockMethod } from 'vite-plugin-mock';

// 模拟文章数据
const articleMock: MockMethod[] = [
  // 获取文章列表
  {
    url: '/api/articles',
    method: 'get',
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      // 生成模拟列表数据
      const list = Array.from({ length: limit }, (_, i) => ({
        id: (page - 1) * limit + i + 1,
        title: `Vue3 + TypeScript 实战文章 ${(page - 1) * limit + i + 1}`,
        author: 'Mock作者',
        createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        summary: '这是一篇关于Vue3生态实战的模拟文章摘要，包含Pinia、Element Plus等技术应用...'
      }));
      return {
        code: 200,
        message: 'success',
        data: {
          list,
          total: 50, // 总条数（模拟）
          page,
          limit
        }
      };
    }
  },
  // 获取文章详情
  {
    url: '/api/articles/:id',
    method: 'get',
    response: ({ params }) => {
      console.log(params, '////');
      // const { id } = params;
      // return {
      //   code: 200,
      //   message: 'success',
      //   data: {
      //     id: Number(id),
      //     title: `Vue3 + TypeScript 实战文章 ${id}`,
      //     author: 'Mock作者',
      //     createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      //     content: `
      //       <h3>文章详情 ${id}</h3>
      //       <p>这是文章ID为 ${id} 的完整内容，基于Vue3 + TypeScript开发，结合Pinia做状态管理，Element Plus做UI组件。</p>
      //       <p>核心技术点：</p>
      //       <ul>
      //         <li>Vue3 组合式API</li>
      //         <li>TypeScript 类型定义</li>
      //         <li>Pinia 状态管理</li>
      //         <li>Element Plus 组件库</li>
      //         <li>Mock 模拟数据</li>
      //       </ul>
      //     `
      //   }
      // };
    }
  }
];

export default articleMock;