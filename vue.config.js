const path = require("path");
module.exports = {
  lintOnSave: false,
  devServer: {
    // 反向代理服务器
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      "/api": {
        target: "http://hmmm-api.itheima.net/", // 跨域请求的地址 http://liufusong.top:7001   http://hmmm-api.itheima.net/
        changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .test(/.svg$/)
      .include.add(path.resolve(__dirname, "./src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/.svg$/)
      .exclude.add(path.resolve(__dirname, "./src/icons/svg"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  },
};
