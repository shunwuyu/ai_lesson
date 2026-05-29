# HTML5 Server-Sent Event

- fetch 可以干什么？
  网页主动获取更新的场景，但是都是需要客户端主动发起请求询问
- 允许网页自动从服务器获取更新

## SSE

- LLM 流式输出怎么实现？

HTML5 Server-Sent Events（SSE）是一种用于实现服务器向客户端推送数据的技术，它允许服务器向客户端发送事件流（Event Stream），并在客户端自动更新。

与传统的 Ajax 技术通过使用轮询来不断获取更新相比，HTML5 SSE 具有更低的延迟和更高的可扩展性，因为它使用单个长连接来保持数据流，而不是发送多个短连接。

## EventSource对象
html5 API
用于创建服务器发送事件流的连接。
- 单向通信：EventSource 对象只能从服务器接收数据，而不能向服务器发送数据。
  const eventSource = new EventSource("/backend-path");
- 自动重连：如果连接断开，EventSource 对象会自动尝试重新连接服务器，直到连接成功或达到最大重连次数为止。
  
- EventSource 对象可以监听来自服务器的事件，并在事件发生时触发相应的事件处理程序。
  eventSource.onopen = function(event) {
    console.log("Connection opened.");
  };
  eventSource.onmessage = function(event) {
    console.log("Received data: " + event.data);
  };

  eventSource.onerror = function(event) {
  console.log("Error occurred: " + event);
};

服务器支持 text/event-stream


