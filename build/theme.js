var path = require('path')
var config = require('../config')
var copy = require('copy');
var themeName = process.env.THEME || config.dev.theme || 'default';
var toPath = path.join(__dirname, '../src/themes/current');
var fromPath = path.join(__dirname, '../src/themes', themeName);

// TODO 这个操作最好是同步的。
copy(fromPath + '/**.*', toPath, function (err, files) {
    if (err) throw err;
    // `files` is an array of the files that were copied
});

// 由于 themes下的文件，只有current与项目有依赖关系，修改其他主题文件，不能触发webpack重新编译，
// 这里监控其他文件改变，改变之后copy到current，从而触发webpack编译

// 如果这样 NODE_ENV=development npm run dev ,这里得到的是development，否则默认得到的是dev
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
    var chokidar = require('chokidar');

    // One-liner for current directory, ignores .dotfiles
    chokidar.watch(fromPath, {ignored: /[\/\\]\./}).on('all', (event, path) => {
        console.log(event, path);
        // TODO 这个操作最好是同步的。
        copy(fromPath + '/**.*', toPath, function (err, files) {
            if (err) throw err;
            // `files` is an array of the files that were copied
        });
    });
}