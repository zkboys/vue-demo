// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var proxyTables = {
  // '/api/organization/users': 'http://localhost:3001', // 开发过程中，可以代理具体的url到后端开发机器上。
  // '/api/**': 'http://localhost:3001',
  '/api/**': 'http://wangshubin.com', // 要设置 options.changeOrigin = true;
};
module.exports = {
  build: {
    env: require('./prod.env'),
    theme: 'default',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    theme: 'default',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyTables,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
