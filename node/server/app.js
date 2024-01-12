// app.js
const path = require("path");
const fs = require("fs");

const basePath = path.join("../test/");
const typeAlias = {
  js: "application/javascript",
  css: "text/css",
  html: "text/html",
  json: "application/json",
};

app.use(function (req, res) {
  // 提供html页面
  if (req.url === "/index.html") {
    let html = fs.readFileSync(path.join(basePath, "index.html"), "utf-8");
    res.setHeader("Content-Type", typeAlias.html);
    res.statusCode = 200;
    res.end(html);
  } else {
    res.end("");
  }
});
