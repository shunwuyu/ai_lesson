import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws'; // 引入 ws 模块，用于创建 WebSocket 服务器
// 引入 TTS 语音流服务，用于处理 TTS 语音流的请求
import { TtsRelayService } from './speech/tts-relay.service';

// 复用 Nest 的 http 服务，挂载 ws 服务，
// 指定路径；客户端连入时注册会话，断开时销毁会话。

async function bootstrap() {
  // 创建 Nest 应用实例
  const app = await NestFactory.create(AppModule);
  //Nest 的依赖注入盒子，所有 Service 实例都放里面，统一创建、管理。
  // speech 模块向外暴露 TtsRelayService，app.get 可以获取到实例。
  const ttsRelayService = app.get(TtsRelayService);
  // 获取 http 服务实例，用于挂载 ws 服务
  const server = app.getHttpServer();

  const ttsWss = new WebSocketServer({
    // 挂载到 http 服务上，监听 ws 请求
    server,
    // ws 连接指定专属地址
    // 客户端连这个路径，服务才能识别是 TTS 语音流的 ws 请求。
    path: '/speech/tts/ws',
  });

  ttsWss.on('connection', (socket, request) => {
    // socket 就是刚连上的客户端 ws 连接对象，用来收发消息，断开时监听关闭事件。
    // buildUrl  
    const reqUrl = new URL(request.url ?? '', 'http://localhost');
    
    // 从 ws 请求 URL 中获取 sessionId 参数
    const wantedSessionId = reqUrl.searchParams.get('sessionId') ?? undefined;
     console.log(wantedSessionId);
    // 注册客户端会话，返回会话 ID
    const sessionId = ttsRelayService.registerClient(socket, wantedSessionId);

    socket.on('close', () => {
      ttsRelayService.unregisterClient(sessionId);
    });
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
