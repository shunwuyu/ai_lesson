// app.js
const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// SSE route
app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.flushHeaders();

  setInterval(() => {
    const message = `Current time is ${new Date().toLocaleTimeString()}`
    res.write(`data: ${message}\n\n`);
  }, 1000);
});

http.listen(3006, () => {
  console.log("Server listening on port http://localhost:3006/");
});
