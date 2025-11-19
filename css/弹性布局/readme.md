# 弹性布局
- flexBox
  Flexbox（弹性盒子布局）是一种CSS布局模型，旨在通过一维空间内项目的灵活伸缩与对齐，高效实现响应式和自适应的用户界面布局。
- 简便，完整，响应式的实现各种页面布局
  flex: 1

## 弹性容器特性
1. 子容器可以设置 flex-direction: column; 来设置主轴为垂直方向
2. 弹性容器默认主轴居中对齐，设置 justify-content: center; 实现主轴居中对齐
3. 弹性容器默认交叉轴居中对齐，设置 align-items: center; 实现交叉轴居中对齐
4. 子容器默认不换行，设置 flex-wrap: wrap; 实现换行
5. flex-flow: row wrap; 来代替 flex-direction 和 flex-wrap
6. align-content: center; 当存在多跟主轴时，控制所有子元素在交叉轴上居中

# 子元素特性
1. 弹性容器有主轴和交叉轴之分，默认主轴是水平方向，交叉轴是垂直方向
2. 弹性容器的子元素默认沿主轴排列
3. 子容器可以设置 order 属性来改变他们的顺序，值越小越靠前
4. 子容器默认不放大，但可以设置 flex-grow: 1; 实现放大
5. 子容器默认可以缩小，但可以设置 flex-shrink: 0; 不缩小
6. 子容器默认根据内容自动调整宽度，设置 flex-basis: 100px; 实现固定宽度
7. 子容器可以设置 flex: 1 0 100px; 来代替 flex-grow, flex-shrink, flex-basis




# 多栏目布局
1. 双栏布局
2. 三栏布局