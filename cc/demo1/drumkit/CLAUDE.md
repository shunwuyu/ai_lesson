# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于原生 JavaScript 的虚拟鼓机 (Drum Kit) 项目，通过键盘按键触发鼓点声音，并带有视觉反馈效果。

## 运行方式

直接在浏览器中打开 `index.html` 文件即可运行，无需构建或依赖安装。

## 项目结构

```
drumkit/
├── index.html       # 主页面，包含 HTML 结构和内联 JavaScript
├── style.css        # 样式表
├── background.jpg   # 背景图片
└── sounds/          # 音效文件目录
    ├── clap.wav
    ├── hihat.wav
    ├── kick.wav
    ├── openhat.wav
    ├── boom.wav
    ├── ride.wav
    ├── snare.wav
    ├── tom.wav
    └── tink.wav
```

## 核心架构

### 键位映射
- 每个按键对应一个 `data-key` 属性（键盘 keyCode）
- HTML 元素和 `<audio>` 标签通过相同的 `data-key` 关联
- 可用按键：A(65), S(83), D(68), F(70), G(71), H(72), J(74), K(75), L(76)

### 交互逻辑
- `keydown` 事件监听器触发 `playSound()` 函数
- `playSound()` 重置音频进度并播放，同时添加 `playing` CSS 类
- `transitionend` 事件监听器触发 `removeTransition()` 函数
- `removeTransition()` 监听 `transform` 属性变化来移除 `playing` 类

### 视觉反馈
- `.playing` 类通过 `transform: scale(1.1)` 和边框高亮提供击打效果
- 依赖 CSS transition 实现 0.07s 的平滑动画