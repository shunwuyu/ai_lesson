# ref vs reactive

ref 用来定义 基本类型或单值 的响应式数据，通过 .value 访问；
reactive 用来定义 对象或数组 的响应式数据，通过 Proxy 深层响应 实现，无需 .value。

