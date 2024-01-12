// 预构件
const esbuild = require("esbuild");

async function prebuild() {
  try {
    await esbuild.build({
      entryPoints: ["public/main.js"], // 你的入口文件
      bundle: true, // 打包所有依赖
      minify: true, // 最小化代码
      outfile: "public/built.js", // 输出文件的位置
    });

    console.log("Build completed");
  } catch (e) {
    console.error("Build failed:", e);
  }
}

prebuild();
