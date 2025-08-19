# 图片

处理一下图片，图片被压缩了，怎么让它按照正常的比例展示

- 图片被压缩或拉伸，通常是因为容器尺寸和图片本身比例不一致，而 CSS 默认会强制把图片塞进容器。解决方案的核心就是 保持宽高比。”

## 解决方案 

- img 标签 只固定一个维度，让另一个自适应：
    img {
  width: 100%;  /* 宽度跟随容器 */
  height: auto; /* 高度按比例缩放 */
}


- 防止图片撑破容器：

img {
  max-width: 100%;
  height: auto;
}

保证图片不会超过父容器，常见于富文本编辑器。

- object-fit
img {
  width: 100%;
  height: 200px;
  object-fit: cover;   /* 按比例裁剪填充 */
}

object-fit 在低版本 IE 不支持，可以用背景图方案替代。


用户头像、轮播图、商品图。

- 背景图片的处理（比 img 更灵活）
background-size: cover; 


- 所以我处理图片比例的思路是：

img 标签 用 width:auto/height:auto 或 object-fit 控制。

背景图 用 background-size: cover/contain 灵活布局。
在业务里我会根据场景选择：比如 商品图一定要保持比例就用 contain，banner 背景则更注重视觉铺满就用 cover。同时结合懒加载和响应式图片提升性能。”

