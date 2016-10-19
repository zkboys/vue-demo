# vue-demo

> vue2.0 项目 vue2.0 webpack vuex es6 vue-router

## 构建

``` bash
# 安装所有的依赖
npm install

# 开启本地热替换服务器： localhost:8080
npm run dev

# 构建开发环境代码
npm run build

# 运行单元测试
npm run unit

# 运行端对端测试
npm run e2e

# 运行所有测试
npm test
```
## 项目结构
```
build // 构建相关，开发一般不需要关注
config // 项目的配置，build所用到，开发一般不用关注
src // 项目代码目录，开发主要关心目录
static // 手动引入，非npm安装的静态文件
test // 测试目录
```

## src/components约定
开发主要关注的就是src/components目录，为了使项目做到后期不至于太过于混乱，开发过程中要遵循几个约定

1. 所有的组件在src/components中新建一个文件夹，其中包括 `index.vue` `style.less/style.css` 和其他文件（一般是图片）
1. `index.vue` 文件包括html模版，js的引入，less/css的引入
1. 样式引入要加入`scoped`属性，防止各组件样式冲突：`<style scoped lang="less" src="./style.less"></style>`


## 相关链接
[guide](http://vuejs-templates.github.io/webpack/) 
[docs for vue-loader](http://vuejs.github.io/vue-loader)
[vue](https://vuejs.org)
[forum](https://forum.vuejs.org)
[Gitter Chat](https://gitter.im/vuejs/vue)
[vue Twitter](https://twitter.com/vuejs)
[vue-router](http://router.vuejs.org/)
[vuex](http://vuex.vuejs.org/)
[vue-loader](http://vue-loader.vuejs.org/)
[awesome-vue](https://github.com/vuejs/awesome-vue)

