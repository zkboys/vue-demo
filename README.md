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

## 主题
项目支持主题功能，通过`src/themes/`目录下配置不同的`variables.less` 简单的实现主题功能

实现原理：构建时，将制定的主题文件夹中的内容copy到current文件夹中，代码中引用的都是current文件夹中的`variables.less`。

开发时可以通过配置环境变量THEME，来区分启用那个主题，其中THEME变量值为`src/themes/`对应的文件夹名称，默认`default`
```bash
$ THEME=red npm run dev
```

构建单个主题
```bash
$ THEME=red npm run build
```

构建全部主题，顺序构建所有的主题（性能不好，太慢了）
```
"build:all": "THEME=red npm run build && THEME=yellow npm run build ",
```
注：如果新增主题，需要修改`build:all`脚本

## 路由
各个模块下的路由，写在各自模块下，以`routes.js`文件命名，构建时，会通过`build/generate-routes.js` 自动生成`src/all-routes.js`文件，并使用`build/routes-loader.js` 简化写法

## action 
自定义 `src/store/utils/create-action.js`方法，规范、简化action写法，实现方案参考的是[redux-acitions](https://github.com/acdlite/redux-actions),

### meta中约定的配置
1. autoShowError
1. autoShowPending 

## modules
主要针对异步，封装了`src/store/utils/handle-mutation.js`方法，具体用法如下:

```js

export default {
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        [types.CHANGE_HELLO_MESSAGE]: handleMutation({
            pending(state) {
                state.pending = true;
            },
            resolve(state, payload) {
                state.pending = false;
                state.message = payload;
            },
            reject(state, error) {
                state.pending = false;
                state.message = `is a error ${error}`;
            },
        }),
        ...
    },
};
```

## 本地存储
将module中某些state存入localStorage中，需要在module中添加syncToLocal配置
将localStorage中的数据同步回store中，需要在具体的module中编写 types.SYNC_STATE_FROM_STORAGE mutation
```js
......

export default {
    syncToLocal: {
        message: true,
    },
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        
        ......
        
        [types.SYNC_STATE_FROM_STORAGE](state, action) {
            const {payload} = action;
            if (payload.hello && payload.hello.message) {
                state.message = payload.hello.message;
            }
        },
    },
};

```
将state从localStorage中同步到系统中
`/actions/app.js` 中定义了 `syncStateFromLocalStorage` action，用于将localStorage中的state同步到项目中，默认的，项目启动时，会在`src/main.js`中触发一次`syncStateFromLocalStorage`,将所有的state同步

如果需要单独同步具体的state，可以单独触发`syncStateFromLocalStorage`action，详见`/actions/app.js`中的实现
从localStorage中同步state，需要具体的modules支持：
```

export default {
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        ...
        [types.SYNC_STATE_FROM_STORAGE](state, action) { // 这个type的action 由`/actions/app.js` 中的 `syncStateFromLocalStorage`触发
            const {payload} = action;
            state.message = payload.hello.message;
        },
    },
};
```

## 异常处理
系统通过`src/store/plugins/handle-error.js`处理系统异常，主要是异步产生的异常。

## 系统中的常量`src/constants`
1. local-item-keys.js // 要同步到localStorage中的数据的key，一般给meta.sync赋值，只看这个文件，就知道有哪些state同步到localStorage中。
1. mutation-types.js // 系统中所有的action type，语义化命名，只看这个文件，就知道系统中有哪些action
1. url.js // 系统中所有异步请求的url，以`_URL`结尾，便于跟action进行区分，统一设置成常量，只看这个文件，就知道系统中有哪些请求，便于后期查看，维护,



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
[chokidar-文件watch](https://github.com/paulmillr/chokidar)

## TODO
[ ] js 从vue分离出来，eslint 的 preLoader 不起作用，不从vue分离出来，IDE的eslint不起作用
 