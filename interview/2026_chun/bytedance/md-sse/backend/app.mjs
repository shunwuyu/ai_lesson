import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT || 8787);

const corsOptions = {
  origin: '*',
  methods: 'GET',
  credentials: true
};
app.use(cors(corsOptions));

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.write(": ok\n\n");

  const heartBeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 15000);

  const mdPath = path.join('./', "content.md");
  const stream = fs.createReadStream(mdPath, { encoding: "utf8", highWaterMark: 1024 });

  stream.on("data", (chunk) => {
    // 👇 这是唯一要改的地方！把 \n 转成 \\n
    const safeData = chunk.replace(/\n/g, "\\n").replace(/\r/g, "");
  
    res.write(`event: message\n`);
    res.write(`data: ${safeData}\n\n`); // 必须用 safeData！
  });

  stream.on("end", () => {
    res.write(`event: end\n`);
    res.write(`data: [DONE]\n\n`);
    setTimeout(() => res.end(), 500);
    clearInterval(heartBeat);
  });

  stream.on("error", (err) => {
    res.write(`event: error\n`);
    res.write(`data: ${JSON.stringify({ message: err.message })}\n\n`);
    clearInterval(heartBeat);
    res.end();
  });

  req.on("close", () => {
    clearInterval(heartBeat);
    stream.destroy();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}/sse`);
});