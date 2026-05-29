// import { Random } from 'mockjs';

// // 模拟 50% 成功率
// function randomSuccess() {
//   return Math.random() > 0.5;
// }

function randomSuccess() {
  return Math.random() > 0.5;
}

export default [
  {
    url: '/api/todos',
    method: 'get',
    response: () => ({
      code: 0,
      data: [
        { id: 1, text: '学习 React', completed: false },
        { id: 2, text: '写项目', completed: false },
        { id: 3, text: '喝咖啡', completed: false },
      ],
    }),
  },
  {
    url: '/api/todos/toggle',
    method: 'post',
    timeout: 800, // 模拟网络延迟
    response: (request) => {
      const { id, completed } = request.body;

      if (randomSuccess()) {
        return {
          code: 0,
          message: '更新成功',
          data: { id, completed },
        };
      } else {
        return {
          code: 500,
          message: '网络不稳定，更新失败！',
          data: null,
        };
      }
    },
  },
] 