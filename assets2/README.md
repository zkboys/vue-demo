# Vue Project FrameWork

> 基于 Vue.js2.0 全家桶 Element 前端架构

## 安装&启动

``` bash
# 安装所有依赖
npm install

# 使用cnpm安装所有依赖，提高安装速度
cnpm install

# 启动一个热刷新、热重载，前端开发服务： localhost:8080
npm run dev

# 构建生产环境所需文件
npm run build

# 构建生产环境所需文件，并输出日志信息
npm run build --report

# 运行单元测试
npm run unit

# 运行端对端测试
npm run e2e

# 运行单元测试和端对端测试
npm test
```

更多细节，请参考 [guide](http://vuejs-templates.github.io/webpack/) 和 [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 安装Node.JS

[brew](https://brew.sh/) 是Mac上的包管理工具，其他情况参考 https://nodejs.org/en/download/

```shell
$ brew install node@6
```

也可以通过 [nvm](https://github.com/creationix/nvm) 安装，它是Node的版本工具，可以使用homebrew安装nvm，再通过nvm安装指定版本的node

```shell
$ brew install nvm
$ nvm install v6.10.0
```

[nrm](https://github.com/Pana/nrm) 是npm的镜像管理工具，可以帮助你简单快速的切换镜像

```shell
$ npm install -g nrm
$ nrm ls
* npm -----  https://registry.npmjs.org/
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  rednpm -- http://registry.mirror.cqupt.edu.cn
  skimdb -- https://skimdb.npmjs.com/registry
```

最后确认node是否安装正确

```shell
$ node -v
v6.10.0
```

## npm or cnpm 使用
cnpm用法类似npm（将npm替换成cnpm即可）,cnpm使用的是国内（淘宝）镜像，不需要翻墙，安装速度较快。

```
# 安装所有依赖
$ npm install

# 安装某一个库，vue为例:
$ npm install vue --save

# 查看npm 其他命令用法
$ npm -h
```
参数说明：--save修改package.json中 dependencies属性（生产环境依赖）， --save-dev将修改package.json中devDependencies属性（开发依赖），安装新的依赖，一定要指定--save 或者 --save-dev参数，否则其他人安装所有依赖时，将会缺少某个依赖

## 页面

### 头部
- 头部固定
- 头部导航

### 具体页面头部
- 固定、滚动两种方式，可配置
- title、面包屑导航根据href自动判定

### 左侧
- 左侧固定，溢出可滚动
- 左侧菜单状态（展开、选中）根据href自动判定

### 主体内容
- 横向滚动 + 纵向滚动

## 架构
- vuex封装
    - 异常处理
    - 本地存储
    - 异步请求封装

- axios封装
    - 结合vuex进行封装
    - restfull相关方法提供：get post put delete
    - 统一错误处理
    - 统一错误提示可配置是否启用，默认启用
    - 统一loading提示可配置是否启用，默认启用
    - 多次相同请求，抛弃前面几次，只保留最后一次的相关封装

- element 按需加载？按需加载需要写过多代码，但是可以减小js体积；全部引入比较方便，但是js体积会大些。
- routes.js文件拆分，通过routes-loader简化写法，代码分割，按需加载各页面js
- 路由使用history方式，菜单 & 面包屑 根据href自动判定
- 多次点击菜单，异步加载页面js，防止串页封装

## 系统事件总线
vuex解决了跨组件传递数据问题，跨组件事件可以通过全局的事件总线来决绝。
```js
// 非父子关系组件间通信
var bus = new Vue()
// in component A's method
bus.$emit('id-selected', 1)
// in component B's created hook
bus.$on('id-selected', function (id) {
  // ...
})

// 项目中使用mixins方式，全局给vue添加了data  eventBus，使用方法如下：
this.$eventBus.$emit(...);
this.$eventBus.$on(...);
```

## 字体图标 icon-font
- element自带图标
- 开源库[iconfont](http://www.iconfont.cn/)、[icomoon](https://icomoon.io/)、[font-awesome](http://fontawesome.io/)
- 设计利用[iconfont](http://www.iconfont.cn/)定制

## 问题
- 是否启用eslint
- element是否按需加载

