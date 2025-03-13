# Iconfont的实现原理

Iconfont通过将图标转换为字体文件，利用CSS的@font-face规则和伪元素::before或::after来显示图标，实现矢量图标的灵活缩放和样式定制。
改颜色
font-size 大小

.icon-aixin::before {
            font-family: 'iconfont'; /* Iconfont字体名称 */
            content: "\e601"; /* 对应图标的unicode编码 */
            font-size: 24px; /* 调整图标大小 */
            color: red; /* 改变图标颜色 */
        }

