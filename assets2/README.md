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
cnpm用法类似npm（将npm替换成cnpm即可）,cnpm使用的是国内（淘宝）镜像，不需要翻墙，安装速度较快，选择使用一个依赖，需要与团队讨论，是否需要引入，不要随意引入依赖。

```
# 安装所有依赖
$ npm install

# 安装某一个库，vue为例:
$ npm install vue --save

# 查看npm 其他命令用法
$ npm -h
```
参数说明：--save修改package.json中 dependencies属性（生产环境依赖）， --save-dev将修改package.json中devDependencies属性（开发依赖），安装新的依赖，一定要指定--save 或者 --save-dev参数，否则其他人安装所有依赖时，将会缺少某个依赖

## 项目结构
前端项目各个文件说明如下：
```

```

## 代码规范
前端代码规范通过[eslint](http://eslint.org/)工具进行强制规范，目前使用的是[javascript-standard-style](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style)

### IDE 插件配置
使用IDE插件，IDE可以基于[eslint](http://eslint.org/)给予友好的规范错误提示，[WebStorm](https://www.jetbrains.com/webstorm/)（IntelliJ系列IDE）具体配置如下：
```
File -> Default Settings -> 输入框输入 'eslint'

Node interpreter 系统中node安装目录
ESLint package  当前项目安装的eslint目录
Configuration file 当前项目中 .eslintrc.js 文件路径
```
具体配置参考如下：

![配置图](http://www.zkboys.com/2016/03/24/%E5%89%8D%E7%AB%AF%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83/idea-eslint-config.png)

## 路由写法
前端路由，使用的是[vue-router](http://router.vuejs.org/)，
规模比较大的项目，如果路由都写到一个文件中，会比较乱，多人协作开发也经常会产生版本冲突，将路由文件分散到各个模块下，会避免这些问题。
各个模块下的路由，写在各自模块下，以`routes.js`文件命名；
构建时，会通过`build/generate-routes.js` 自动生成`src/all-routes.js`文件；
并使用`build/routes-loader.js` 简化异步组件（各个页面的js会按需加载）写法：
```
/*
 * 自定义路由loader
 * asyncComponent: './index.vue',
 * ===>
 * component: (resolve) => {
 *      require.ensure([], () => {
 *          resolve(require('./index.vue'));
 *      });
 * },
 * */
```

## axios封装

## [vuex](https://vuex.vuejs.org/)封装

### 异步请求
#### 写法
#### loading提示
#### error提示
#### success提示

### 本地存储封装

## 关于左侧菜单

## 关于页面头部

### 标题

### 面包屑导航



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
管理系统会用大量的小图标，比如删除、添加、菜单图标等等，推荐使用icon-font，系统提供了element自带图标、[font-awesome](http://fontawesome.io/)的封装。

其他方法：（系统暂未提供）

- 开源库[iconfont](http://www.iconfont.cn/)、[icomoon](https://icomoon.io/)
- 设计利用[iconfont](http://www.iconfont.cn/)定制


## 页面

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


## 问题
- 是否启用eslint
- element是否按需加载

