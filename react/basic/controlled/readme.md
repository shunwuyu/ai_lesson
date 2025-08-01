# 受控组件和非受控组件
- Controlled 
  受控组件是指表单输入的值由 React 的状态（state）控制。
  表单的 value 始终由组件的 state 驱动。
  修改表单，实际上是调用 onChange 更新 state，再由 state 更新输入框。

- Uncontrolled
  非受控组件是指表单输入的值不受 React 状态控制，而是通过 DOM 节点的 ref 来获取。
  表单自己维护状态。
  React 不关心你输入了什么，获取时通过 ref。

- 实际使用场景

  场景	                        推荐方式	     原因说明
表单需要实时校验、联动、统一提交	   受控组件	      更容易统一管理状态
只读取一次输入值（如上传文件、评论）	非受控组件	   简单、性能好
第三方库或老项目中有很多原生 DOM	非受控组件更合适	无需重构整个组件为受控

- 受控组件性能问题
受控组件频繁修改状态，可能引起频繁 re-render，影响性能。
  - 输入防抖（debounce）或节流（throttle）。

- 受控组件和非受控组件如何选
  - 表单量小 + 交互简单 → 非受控。
  - 表单量大 + 需要校验、联动 → 受控。


对比项	受控组件	非受控组件
数据来源	React 状态	DOM（ref）
是否实时更新	是（每次输入都更新 state）	否
适用场景	复杂表单、校验、联动	简单表单、一次性取值
性能	容易 re-render	更高效

- react-hook-form 内部使用非受控 + register + ref

