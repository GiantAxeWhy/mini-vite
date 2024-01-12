const express = require("express");
const { parse } = require("es-module-lexer");
const WebSocket = require("ws");
const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const app = express();
const port = 3000;

// 静态文件服务
app.use(express.static("public"));

// WebSocket 服务器用于 HMR
const wss = new WebSocket.Server({ noServer: true });

async function prebuild() {
  try {
    await esbuild.build({
      entryPoints: ["public/main.js"], // 适当调整您的入口文件路径
      bundle: true,
      outfile: "public/built.js",
    });
    console.log("Prebuild completed");
  } catch (e) {
    console.error("Prebuild failed:", e);
  }
}

// 文件监视器
const watcher = chokidar.watch("./**/*.js", {
  ignored: /node_modules/,
});

console.log(process.cwd());
watcher.on("change", async (changedPath) => {
  const relativePath = path.relative(
    path.join(__dirname, "public"),
    changedPath
  );
  await prebuild();
  // 当文件更改时，发送更新消息给客户端
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "update", path: relativePath }));
    }
  });
});

// 创建 HTTP 服务器并与 WebSocket 服务器关联
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
