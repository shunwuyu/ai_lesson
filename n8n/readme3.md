# 使用n8n 编写科技新闻的简报 

- url
  https://rss.feedspot.com/technology_rss_feeds/

  RSS（简易信息聚合）是一种用于发布和订阅网站内容（如新闻、博客）更新的标准化格式，让用户能通过阅读器集中、高效地获取最新信息。

  FeedSpot平台提供的科技类RSS订阅源排行榜，汇集了ZDNet、TMCnet等全球顶尖科技博客、媒体和资讯网站的RSS链接，方便用户订阅和获取最新的技术新闻、趋势分析及行业洞察。

  https://www.wired.com/feed/rss 

- 功能
  基于rss 源为自己或用户编写发布每天的AI 资讯。

- 添加一个手动触发器节点
- 添加一个rss 源节点
  不需要http节点，直接rss 
  写入url https://rss.feedspot.com/technology_rss_feeds/
  这是《连线》（Wired）杂志官网的RSS订阅源，持续更新关于科技、文化、创新及其对社会与生活影响的深度报道和前沿分析。
  重命名为Wired RSS 
- 添加一个filter 节点
  改名为PubDate Filter  基于发布日期改名
  拖拽pubdate 到 filter 节点 选择 Date&Time isAfter 
  切换到expression js 代码 {{new Date((new Date()).getTime()-24*60*60*1000)}}
  过去一天的
- 添加一个DataTransformer 节点
    - EditFields
    - 拖拽title、link、pubDate、content 
    得到了精简
    - 新增一个field content_block 将标题和摘要放一起，便于后续交给大模型
    {{ "Title:" + $json.title + "\n" + "Description:" + $json.content  }}
- 添加一个AI
  - 选择AI Agent 节点
  - 选择Define blow
  - prompt
    将content_block 拖拽进来
- 添加一个aggregate 节点
  将各个条目聚合起来
  拖拽content_block  将组合到一个数组里

- 添加聊天模型
  - 选择openai 
    - 使用的是DeepSeek
    https://platform.deepseek.com/api_keys
    baseUrl https://api.deepseek.com
    - 将{{ $json.content_block.join("\n\n") }} 作为Prompt
    - Options 选择 Samping Temperature
    0.1
    大模型中的temperature参数用于控制生成文本的随机性：值越低，输出越确定、保守；值越高，输出越随机、富有创造性。
  - 设置系统提示词
    You are a professional tech news editor.
    Based on users news input, write the popular post - daily tech.

    Write it in Markdown.

    Your response should just contain the Markdown content.
    
    专业的科技新闻编辑

- 添加节点 convert_to_file
  - convert_to_textFile
  - 拖拽output 到 TextInputField
- 添加节点 Read/Write Files from 
  - writeFileToDisk
  设置一个文件路径 
  /Users/shunwuyu/workspace/lesson/ai_lesson/n8n/daily-tech.md