# 口播训练室

可以从小红书，抖音，哔哩哔哩等平台获取一个优质的自媒体的口播内容，然后去支持跟读训练。
帮助我们提升做自媒体的一个口播表达能力的一个平台。
点击开启摄像头， 逐字开始训练。 

## 数据处理流程

### MediaCrawler 
https://github.com/NanmiCoder/MediaCrawler
MediaCrawler 是开源自媒体爬虫，可采集小红书、抖音、B 站等多平台公开自媒体数据，借助浏览器自动化（playright）规避 JS 逆向难题，附带 WebUI 界面与多格式数据导出能力CSDN博...

### SenseVoiceSmall 
千问的模型
https://github.com/QwenAudio/SenseVoice
SenseVoiceSmall 是阿里通义千问开源的低延迟语音模型，集语音识别、语种、情感、音频事件检测于一体。
## FunASR 和 FFmpeg 
音视频的提取，以及语音识别， 格式化转换和数据清洗。
https://github.com/modelscope/FunASR
FunASR 是达摩院开源工业级语音工具箱，集成多款 SOTA 语音模型，支持语音转写、vad、说话人分离、情感识别，适配离线、流式与边缘部署GitHub

https://github.com/FFmpeg/FFmpeg
FFmpeg 是免费开源跨平台的音视频全能处理库，可完成转码、剪辑、滤镜、流媒体推流等各类音视频任务。

## MediaCrawler 自媒体平台爬虫
- codex 新建一个项目 
  media-crawler-tutorial
  选择桌面目录， create
- monorepo
  **所有项目全部塞进同一个 Git 仓库里面**，一个仓库管理一堆子项目。
  你要做一个**全家桶项目**：爬虫 + API 服务 + Web 后台，一套体系一起开发部署。
  团队内部项目，希望统一代码规范、统一 eslint、统一版本、统一脚本命令。
  my‑product/
├─ apps/
│  ├─ website/      # 网站
│  ├─ admin/        # 管理后台
│  └─ mobile‑app/   # 手机 App
├─ packages/
│  ├─ ui/           # 共用界面组件
│  └─ utils/        # 共用工具代码
└─ package.json

- 初始化
```
https://github.com/NanmiCoder/MediaCrawler 将这个文件夹初始化git, 并且使用pnpm 的 monorepo 的方式， 把这个项目安装到 app/ 目录下
```

- apps/media-crawler/config/base_config.py
  ENABLE_GET_MEIDAS = true # 开启获取自媒体数据的功能

- 运行项目

- 选择bilibili
  影视飓风
  罗永浩十字路口

- 帮我安装 https://github.com/modelscope/FunASR 和 https://github.com/QwenAudio/SenseVoice 两个项目 到/apps 目录下，目录分别为 funasr 和 sensevoice，我之后要对下载视频进行转录需要用到他们

