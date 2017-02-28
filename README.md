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
static // 手动引入，非npm安装的静态文件，不通过webpack打包的文件（与项目不存在引用关系，不会被webpack打包）
test // 测试目录
```

## src/components约定
开发主要关注的就是src/components目录，为了使项目做到后期不至于太过于混乱，开发过程中要遵循几个约定

1. 所有的组件在src/components中新建一个文件夹，其中包括 `index.vue` `style.less/style.css` 和其他文件（一般是图片）
1. `index.vue` 文件包括html模版，js的引入，less/css的引入
1. 样式引入要加入`scoped`属性，防止各组件样式冲突：`<style scoped lang="less" src="./style.less"></style>`

## 主题
项目支持主题功能，通过`src/themes/`目录下配置不同的`variables.less` 简单的实现主题功能；
实现原理：构建时，将制定的主题文件夹中的内容copy到current文件夹中，代码中引用的都是current文件夹中的`variables.less`；
例如`hello/style.less`中：`@import '../../themes/current/variables.less';`
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
注：如果新增主题，需要修改`build:all`脚本；`themes/current`文件夹为动态创建的，不要直接修改current中的内容

## 路由
各个模块下的路由，写在各自模块下，以`routes.js`文件命名；
构建时，会通过`build/generate-routes.js` 自动生成`src/all-routes.js`文件；
并使用`build/routes-loader.js` 简化异步组件写法：
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

## vuex-additions
基于Flux Standard Action，自定义了一些方法，对原生vuex进行了一些封装，简化开发；

### action 
自定义 `src/store/vuex-additions/create-action.js`方法，规范、简化action写法，实现方案参考的是[redux-acitions](https://github.com/acdlite/redux-actions),
`createAction`方法接收3个参数：type, payloadCreator, metaCreator

- type: string
- payloadCreator: function | payload 
- metaCreator: function | object 

demo：
```
import {createAction} from '../vuex-additions/index';

import {
    CHANGE_HELLO_MESSAGE,
    GET_USER,
} from '../../constants/mutation-types';


export const getUser = createAction(GET_USER); // 调用此action时，传入的参数，直接作为payload

export const getUser = createAction(GET_USER, 
    ({id}) => id ++ // payloadCreator返回值，作为payload
); 

// payloadCreator 为函数，返回promise作为payload
// metaCreator 为函数，返回的数据作为meta
export const getUser = createAction(GET_USER,
    ({id}) => request.post(GET_USER_URL.replace('{id}', id), {name: 111, pass: 111}), 
    () => ({
        autoShowError: true,
        autoShowPending: true,
    })
);

// payloadCreator 为函数，返回promise作为payload
// metaCreator 为对象，直接将metaCreator作为meta
export const getUser = createAction(GET_USER,
    ({id}) => request.post(GET_USER_URL.replace('{id}', id), {name: 111, pass: 111}), 
    {
        autoShowError: true, 
        autoShowPending: true, 
    }
);
```

### meta中约定的配置
1. autoShowError: 是否自动显示错误信息 handle-error-plugin.js 中会用到
1. autoShowPending: 是否自动显示loading handle-pending-plugin.js 中会用到

### modules
主要针对异步，封装了`src/store/vuex-additions/handle-mutation.js`方法，具体用法如下:
会根据`createAction`中设置的meta（用来标记异步状态），区分异步状态；
自定义`syncToLocal` 属性，用来标记当前module中那些state同步存储到localStorage中，这个属性`sync-state-plugin.js`会用到；
```js

export default {
    syncToLocal: {
        message: true,
    },
    state: {
        message: '初始化message',
        pending: false,
    },
    mutations: {
        [types.CHANGE_HELLO_MESSAGE]: handleMutation({
            always(/* state, action */) { // 总会 pending resolve reject之前被调用，可以做一些共同的处理
            },
            pending(state, /* action */) {
                state.pending = true;
            },
            resolve(state, action) {
                const {payload} = action;
                state.message = payload;
            },
            reject(state, action) {
                const {payload} = action;
                state.message = `is a error ${payload.body}`;
            },
            complete(state, /* action */) { // 在 resolve 或 reject 之后被调用，可以做一些共同的处理
                state.pending = false;
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
系统通过`src/vuex-additions/handle-error-plugin.js`处理系统异常，主要是异步产生的异常。

## 系统中的常量`src/constants`
1. mutation-types.js // 系统中所有的action type，语义化命名，只看这个文件，就知道系统中有哪些action
1. url.js // 系统中所有异步请求的url，以`_URL`结尾，便于跟action进行区分，统一设置成常量，只看这个文件，就知道系统中有哪些请求，便于后期查看，维护,

## 系统事件总线

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

## 相关链接
1. [guide](http://vuejs-templates.github.io/webpack/) 
1. [docs for vue-loader](http://vuejs.github.io/vue-loader)
1. [vue](https://vuejs.org)
1. [forum](https://forum.vuejs.org)
1. [Gitter Chat](https://gitter.im/vuejs/vue)
1. [vue Twitter](https://twitter.com/vuejs)
1. [vue-router](http://router.vuejs.org/)
1. [vuex](http://vuex.vuejs.org/)
1. [vue-loader](http://vue-loader.vuejs.org/)
1. [awesome-vue](https://github.com/vuejs/awesome-vue)
1. [chokidar-文件watch](https://github.com/paulmillr/chokidar)

## TODO
[ ] js 从vue分离出来，eslint 的 preLoader 不起作用，不从vue分离出来，IDE的eslint不起作用
 