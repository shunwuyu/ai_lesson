# 路由系统

编写一个简单的路由系统，该系统包含以下功能：
addRoute(path: string, name: string): void：添加一个新的路由，其中 path 是路径字符串，name 是路由的名称。
match(currentRoute: string): {name: string, params: object | null}：根据当前路径 currentRoute 匹配相应的路由，并返回路由的名称 name 和从路径中提取的参数 params。如果没有匹配的路由，则返回 null。
