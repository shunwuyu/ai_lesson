# expo

## React Native https://reactnative.dev/
- React Native 是由 Meta（原 Facebook）推出的跨平台移动开发框架，它允许开发者使用 JavaScript 和 React 语法 来构建原生移动应用。
- 与 React 不同的是，React 用于构建 Web 前端界面，通过虚拟 DOM 渲染到浏览器；
- 而 React Native 则将组件渲染为 原生控件（Native Components），从而实现接近原生性能的移动体验。
  React Native将JS代码中的<Button>转换为iOS的UIButton或安卓的Button控件，div -> View 直接由系统渲染，而非WebView绘制，因此性能更流畅，外观和交互与本地应用一致。
  ScrollView 可滚动容器
  Switch   开关控件
  FlatList / SectionList  高性能列表渲染组件
  TouchableOpacity 提供点击反馈的封装组件

- React Native 的核心价值在于“一次编写，多端运行”，同一套代码可运行在 iOS 和 Android 上，大大降低了开发成本。它通过 “Bridge” 机制与原生代码通信，因此既能使用 JS 编写逻辑，也能调用原生模块，如摄像头、定位、蓝牙等。

- React Native 让前端工程师用熟悉的 React 技术栈开发原生 App，兼具跨平台效率与原生性能，

总结：
  React Native是一个完整的移动应用开发框架，不仅处理 UI，还提供访问原生设备功能（如相机、GPS、存储等）的能力
  它通过 “桥接”（Bridge） 机制，让 JavaScript 代码与原生代码（iOS/Android）通信。

## expo 

Expo 是一个基于 React Native 的开发工具链与运行环境，旨在让开发者更轻松地构建、调试和发布跨平台移动应用。它相当于为 React Native 提供了一层“增强壳”，集成了打包、调试、构建、发布等常用功能。

在原生 React Native 开发中，开发者需要配置复杂的原生环境（如 Xcode、Android Studio），而 Expo 通过内置 SDK（如相机、推送、定位等）和 Expo Go 应用，让开发者无需配置原生项目即可快速预览和调试。

Expo 与 React Native 的关系是：React Native 是底层框架，Expo 是上层开发平台。Expo 解决了环境搭建复杂、构建流程繁琐的问题，让前端工程师能专注于业务逻辑与界面开发。简单来说，Expo 让 React Native 更“开箱即用”，极大提升了开发效率与可维护性。



## expo go
Expo Go 是一款让 Android 和 iOS 手机无需编译即可直接运行 React Native 项目的预览应用，开发者通过扫描二维码即可实时查看和调试应用

## expo orbit
Expo Orbit 是 Expo 提供的一个基于 Web 的开发环境，开发者可以在浏览器中编写、调试和预览 React Native 项目，无需安装任何本地工具。
https://expo.dev/orbit




## 运行项目
安装 Android Studio 并启动模拟器 
  - https://developer.android.com/studio/run/managing-avds?hl=zh-cn
启动 AVD Manager 创建并运行一个安卓模拟器。
pnpm i @react-native-community/cli-server-api
- https://expo.dev/orbit


## 安装expo cli

```bash
npm install -g expo-cli
expo version
```

## 新建项目
expo init HelloWorld
npm run android/ios/web