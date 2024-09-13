useMemo 缓存了 expensiveComputation 的结果，只有当 count 发生变化时才会重新执行计算，而不会在 otherValue 更新时重新计算。

