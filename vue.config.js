const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  // css文件映射
  css: {
    sourceMap: true
  },
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "http://192.168.2.112:8081",
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    //重点:删除默认配置中处理svg,
    config.module.rules.delete("svg");
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  configureWebpack: () => ({
    // resolve: {
    //  alias: require('./alias.config').webpack
    // }
    // module: {
    //  rules: [{
    //   test: /\.svg$/,
    //   use: [{
    //    loader: "svg-sprite-loader",
    //    options: {
    //     symbolId: 'icon-[name]'
    //    }
    //   }]
    //  }]
    // }
  })
};
