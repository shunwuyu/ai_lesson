function createRouter() {
    const routes = [];

    function addRoute(path, name) {
      // filter(Boolean) 的作用是过滤掉数组中的空字符串元素。
      // 在 JavaScript 中，Boolean 是一个函数，可以将任何值转换为布尔值
      //   当我们将 Boolean 函数作为 filter 的参数时，它会对数组中的每个元素执行 Boolean() 转换
      const pathParts = path.split('/').filter(Boolean);
        // console.log(pathParts, '////');
        const paramKeys = [];
        const regexParts = [];

        for (let part of pathParts) {
            if (part.startsWith(':')) {
              // 查询参数
                paramKeys.push(part.slice(1));
                // [^/] 表示匹配除了斜杠 / 以外的任何字符
                // + 表示匹配前面的模式一次或多次
                regexParts.push('([^/]+)');
            } else {
                regexParts.push(part);
            }
        }
        // 准备正则
        const regex = new RegExp('^/' + regexParts.join('/') + '/?$');
        const matchFunction = (currentRoute) => {
            const matches = currentRoute.match(regex);
            if (!matches) return null;
            const params = {};
            for (let i = 0; i < paramKeys.length; i++) {
                params[paramKeys[i]] = matches[i + 1];
            }
            return { name, params };
        };

        routes.push({ path, matchFunction });
    }

    function match(currentRoute) {
        for (let route of routes) {
            const result = route.matchFunction(currentRoute);
            if (result) return result;
        }
        return null;
    }

    return { addRoute, match };
}

// 测试代码
const router = createRouter();

router.addRoute('/users/:id', 'UserDetail');
// router.addRoute('/posts/:postId/comments/:commentId', 'CommentDetail');

// console.log(router.match('/users/123')); // 输出: {name: 'UserDetail', params: {id: '123'}}
// console.log(router.match('/posts/456/comments/789')); // 输出: {name: 'CommentDetail', params: {postId: '456', commentId: '789'}}
// console.log(router.match('/nonexistent')); // 输出: null