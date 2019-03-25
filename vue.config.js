module.exports = {
  // css文件映射
  css: {
    sourceMap: true
  },
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      }
    }
  }
};
