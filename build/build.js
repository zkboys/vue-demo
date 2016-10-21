// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var themeName = process.env.THEME || config.dev.theme || 'default';

var spinner = ora('building (theme: ' + themeName + ')for production...')
spinner.start()

// 设置皮肤
require('./theme');

// 生成路由
require('./generate-routes.js');

// 进行哪个皮肤的构建，删除哪个皮肤的生成文件
var themeAssetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory, themeName);

rm('-rf', themeAssetsPath)
mkdir('-p', themeAssetsPath)
cp('-R', 'static/', themeAssetsPath)

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})
