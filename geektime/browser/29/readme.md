# HTTP 

- 爱情的基础是什么？
  - 围城， 进去了就别想出来
- 互联网的基础是什么？
  - HTTP协议
  是浏览器和服务器之间的通信语言
  是浏览器中最重要且使用最多的协议

## HTTP历史
随着浏览器的发展， HTTP 为了能适应新的形式也在持续进化。
- 即将完成使命的 HTTP/1
- 正在向我们走来的 HTTP/2
- 以及未来的 HTTP/3

## 超文本传输协议 HTTP/0.9
HTTP/0.9 是于 1991 年提出的, 主要用于学术交流，需求很简单——用来在网络之间传递 HTML 超文本的内容，所以被称为超文本传输协议。
怎么简单？
- 采用了基于请求响应的模式，从客户端发出请求，服务器返回数据。
  请求-响应模式简单、无状态、可扩展，适合互联网的分布式、高并发环境。
  请求链接拿到内容就断开， 支持高并发，
  可扩展 加服务器， 分流到别的服务器  无状态 每个请求都是独立的，服务器不会记住之前的请求。

- 仅支持 GET，不支持 POST， 就是浏览html(论文) 
1.js  各种请求响应

## HTTP/0.9 的一个完整的请求流程
![](https://static001.geekbang.org/resource/image/db/34/db1166c68c22a45c9858e88a234f1a34.png?wh=1142*309)
- 因为 HTTP 都是基于 TCP 协议的，所以客户端先要根据 IP 地址、端口和服务器建立 TCP 连接，而建立连接的过程就是 TCP 协议三次握手的过程。
  ping www.baidu.com

- 建立好连接之后，会发送一个 GET 请求行的信息，如GET /index.html用来获取 index.html。
- 服务器接收请求信息之后，读取对应的 HTML 文件，并将数据以 ASCII 字符流返回给客户端。
- HTML 文档传输完成后，断开连接。

## 三个特点
- 第一个是只有一个请求行，并没有 HTTP 请求头和请求体（没有POST, 也没有cookie 不能登陆），因为只需要一个请求行就可以完整表达客户端的需求了（论文）。
- 第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客户端太多信息，只需要返回数据就可以了。
- 第三个是返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式的文件，所以使用 ASCII 字节码来传输是最合适的。

## 被浏览器推动的 HTTP/1.0
1994 年底出现了拨号上网服务，同年网景又推出一款浏览器，从此万维网就不局限于学术交流了，而是进入了高速的发展阶段。

万维网联盟（W3C）和 HTTP 工作组（HTTP-WG）的创建，它们致力于 HTML 的发展和 HTTP 的改进。

### 新需求
- 支持多种类型的文件
  JavaScript、CSS、图片、音频、视频
  文件格式不仅仅局限于 ASCII 编码，还有很多其他类型编码的文件。

- 那么该如何实现多种类型文件的下载呢？
  HTTP/0.9 在建立好连接之后，只会发送类似GET /index.html的简单请求命令
  没有其他途径告诉服务器更多的信息，如文件编码、文件类型等
  服务器是直接返回数据给浏览器的，也没有其他途径告诉浏览器更多的关于服务器返回的文件信息。 怎么渲染

  HTTP/1.0 引入了请求头和响应头，它们都是以为 Key-Value 形式保存的
  Content-Type: text/html; charset=utf-8
  Content-Type: text/css; charset=utf-8

  ![](https://static001.geekbang.org/resource/image/b5/7d/b52b0d1a26ff2b8607c08e5c50ae687d.png?wh=1142*309)

  ```
  Accept: text/html
  // 告诉服务器客户端优先接受 HTML 格式的响应内容。

Accept-Encoding: gzip, deflate, br
  // 表示客户端支持的压缩算法：gzip、deflate 和 Brotli（br），服务器可据此压缩响应体以减少传输体积。

Accept-Charset: ISO-8859-1,utf-8
  // 指明客户端能理解的字符编码，优先使用列出的字符集（注意：现代浏览器通常省略此头，默认使用 UTF-8）。

Accept-Language: zh-CN,zh
  // 表示客户端偏好中文（中国大陆）内容，其次为其他中文变体，服务器可据此返回本地化内容。
  ```
  其中第一行表示期望服务器返回 html 类型的文件，第二行表示期望服务器可以采用 gzip、deflate 或者 br 其中的一种压缩方式，第三行表示期望返回的文件编码是 UTF-8 或者 ISO-8859-1，第四行是表示期望页面的优先语言是中文。

  下面是一段响应头的数据信息
  content-encoding: br
  content-type: text/html; charset=UTF-8
- 这就引入了状态码
  有的请求服务器可能无法处理，或者处理出错，这时候就需要告诉浏览器服务器最终处理该请求的情况，这就引入了状态码
- 为了减轻服务器的压力，在 HTTP/1.0 中提供了 Cache 机制，用来缓存已经下载过的数据。
- 服务器需要统计客户端的基础信息，比如 Windows 和 macOS 的用户数量分别是多少，所以 HTTP/1.0 的请求头中还加入了用户代理的字段。
  const userAgent = navigator.userAgent;
  console.log(userAgent);

  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36
  Mozilla/5.0：历史兼容标识，几乎所有现代浏览器都保留此前缀，无实际意义。
  (Macintosh; Intel Mac OS X 10_15_7)：
表示操作系统是 macOS Catalina（版本 10.15.7），运行在 Intel 芯片的 Mac 上。
  AppleWebKit/537.36：
使用的是 WebKit 渲染引擎（版本 537.36），这是 Safari 和早期 Chrome 的核心。
  (KHTML, like Gecko)：
兼容性声明，KHTML 是 WebKit 的前身，Gecko 是 Firefox 的引擎，此处仅为历史原因保留。
  Chrome/142.0.0.0：
浏览器是 Google Chrome，版本号为 142.0.0.0（可能是测试版或未来版本）。
  Safari/537.36
  因 Chrome 基于 WebKit（源自 Safari），保留此字段以兼容旧网站检测逻辑。

## 缝缝补补的 HTTP/1.1
- 改进持久连接
  HTTP/1.0 每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段（如下图）。

  ![](https://static001.geekbang.org/resource/image/cc/7d/cccc9faf6d0addea8e1bf307cd7d8d7d.png?wh=1142*1088)
  在当时，由于通信的文件比较小，而且每个页面的引用也不多，所以这种传输形式没什么大问题。但是随着浏览器普及，单个页面中的图片文件越来越多，有时候一个页面可能包含了几百个外部引用的资源文件，如果在下载每个文件的时候，都需要经历建立 TCP 连接、传输数据和断开连接这样的步骤，无疑会增加大量无谓的开销。

  HTTP/1.1 中增加了持久连接的方法，它的特点是在一个 TCP 连接上可以传输多个 HTTP 请求，只要浏览器或者服务器没有明确断开连接，那么该 TCP 连接会一直保持。

  ![](https://static001.geekbang.org/resource/image/80/1a/80b57830e15faa17631bea74054a0e1a.png?wh=1140*804)

  HTTP 的持久连接可以有效减少 TCP 建立连接和断开连接的次数，这样的好处是减少了服务器额外的负担，并提升整体 HTTP 的请求时长。

  Connection: keep-alive

- 客户端 Cookie、安全机制
  