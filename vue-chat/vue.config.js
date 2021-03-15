const webpack = require("webpack");

module.exports = {
  publicPath: "./",
  outputDir: "mchat",
  lintOnSave: false, // 保存自动lint
  assetsDir: "static", // 静态文件地址
  productionSourceMap: false, // 生产环境不开启SourceMap
  configureWebpack: config => {
    // 添加全局函数
    config.plugins.push(
      new webpack.ProvidePlugin({
        _: "lodash"
      })
    );
  },
  chainWebpack: config => {
    // 添加分析工具
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
      }
    }
  }
};
