// const Repositories = () => {
//     // memo 之前 每次都会执行
//     console.log('-----------')
//     return (
//         <>
//         </>
//     )
// }
import { memo } from 'react'
// React.memo 是一个高阶组件（HOC），它可以包装函数组件，
// 通过对比 props 的浅比较来跳过不必要的重新渲染，从而提升组件的性能。
// const Repositories = memo(({callback}) => {
//     console.log('-----------')
//     return (
//         <>
//         </>
//     )
// })

import React from 'react';

const Repositories = React.memo(({ repos, onRefresh }) => {
  console.log('RepositoryList 被重新渲染');

  return (
    <div>
      <h3>仓库列表</h3>
      <button onClick={onRefresh}>刷新</button>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
});

export default Repositories;