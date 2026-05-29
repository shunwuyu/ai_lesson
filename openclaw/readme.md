# clawdbot   -> [openclaw](https://openclaw.ai/)

Your AI assistant that actually does things.
能真正做事的AI助手

- 养虾（claw 钳子）

它被称为又一个“ChatGPT 时刻”，因为它让我们第一次直观感受到：AI 不只是对话工具，而是能独立思考、拆解目标并实际执行任务的行动者，显著降低了构建智能体的门槛，推动 AI 从“回答问题”迈向“完成工作”。

能自己行动的智能体， 像个会抓东西、会干活的小生物，于是大家就戏称是在“养虾”。

- 场景表达

可以处理文件、编码，调用skills、mcp 等等帮我们处理工作。
可以接入各种聊天工具，即使出门在外，没有电脑，只要在聊天工具里面给clawbot 留个言，他就能自动干活 1.png

强大的定时任务系统，只需要用自然语言就可以创建定时任务

具有很强的主观能动性， 有长期记忆（文件本地，上下文带上，主动更新这些文件，越用越聪明的感觉）


- 和manus

    都是agent 助手，能干活。
    manus 是闭源的，几十亿美金被Meta收购，吉安肖弘 财富自由
    openclaw 是开源的，支持私有化部署，一度让mac mini 卖断货。
    一人公司大爆款， 奥地利技术大牛 Peter Steinberger打造， openai 给了传闻中极高的股份，利用最先进的模型，做一个连他妈妈都能轻松使用的超级智能体。

    开源自由 + 顶级算力 + 核心高管位。

- fork 项目 
    [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
    [https://github.com/mengjian-github/openclaw101?tab=readme-ov-file](https://github.com/mengjian-github/openclaw101?tab=readme-ov-file)

    [https://openclaw101.dev/](https://openclaw101.dev/)

## 环境安装

- 任意能运行nodejs 的环境都可以部署clawbot ，比较推荐mac/linux.
    Windows 经常报错，比如路径认不全、权限不够，那为什么mac mini 会比Linux或呢？ 
    mac 有比较不错的桌面环境，可以很方便进行截图工作（大模型分析）， 操作浏览器等

    mac mini 比较省电， 未来能源就是一切

    ```
    nvm Node Version Manager 是一个让你能在同一台电脑上轻松安装、切换和管理多个不同版本 Node.js 的工具。
    # Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    windows  https://github.com/coreybutler/nvm-windows/releases  

# in lieu of restarting the shell
<!-- 这行命令是让 NVM 在当前终端窗口立即生效，不用重启或新开终端就能直接使用 nvm 命令。 -->
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.13.0".

# Verify npm version:
npm -v # Should print "11.6.2".
    ```

- npm i -g openclaw

- 初始化
    openclaw onboard 
    配置AI模型
    配置聊天工具
    选择预装skills 
    后面的跳过
    你可以给我的手机发条消息

- 基础玩法
    
    

## OpenClaw + Qwen 3.5

- 通义最新款的大模型 Qwen 3.5 , 春节期间。


