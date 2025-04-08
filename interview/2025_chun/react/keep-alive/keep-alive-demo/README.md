React 本身不像 Vue 有内建的 <keep-alive> 组件，但我们可以通过 组件缓存 + 条件渲染 来实现类似的效果。

react-activation
import { AliveScope, KeepAlive } from 'react-activation';

<AliveScope>
  <KeepAlive>
    <MyComponent />
  </KeepAlive>
</AliveScope>