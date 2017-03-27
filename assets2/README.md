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
### src/pages约定
业务开发主要关注的就是src/pages目录，为了使项目做到后期不至于太过于混乱，开发过程中要遵循几个约定：

1. 所有的页面（业务模块）如果涉及到多个文件，在src/pages中新建一个文件夹，其中包括 `index.vue` `style.less/style.css` `script.js` `routes.js`和其他文件（一般是图片）
1. `index.vue` 文件包括html模版，js的引入，less/css的引入，如果`.vue`文件中编写script，script标签定义为`<script lang="babel">...</script>`，style定义为：`<style scoped lang="less">...</style>`
1. 样式引入要加入`scoped`属性，防止各组件样式冲突：`<style scoped lang="less" src="./style.less"></style>`

### src/components约定
src/components目录中存放的为项目中使用的公共组件，业务开发一般使用这个目录中的组件即可。

### 系统中的常量`src/constants`
1. constants.js // 系统中处理vuex相关的常量
1. mutation-types.js // 系统中所有的action type，语义化命名，只看这个文件，就知道系统中有哪些action，并且可以防止action type冲突。


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
注：如果新增主题，需要修改`build:all`脚本；`themes/current`文件夹为动态创建的，不要直接修改current中的内容；各个主题文件夹中的内容（变量、文件等）要保持一致；


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
构建时，会通过`build/generate-routes.js` 自动生成`src/all-routes.js`文件，将所有模块下的`routes.js`文件合并；
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

## [vuex](https://vuex.vuejs.org/)封装

### action
自定义 `src/store/vuex-additions/create-action.js`方法，规范、简化action写法，实现方案参考的是[redux-acitions](https://github.com/acdlite/redux-actions),
`createAction`方法接收3个参数：type, payloadCreator, metaCreator

- type: string
- payloadCreator: function | payload
- metaCreator: function | object

demo：
```js
import {createAction} from '../vuex-additions/index';

import * as types from '../../constants/mutation-types';


export const getUser = createAction(types.GET_USER); // 调用此action时，传入的参数，直接作为payload

export const getUser = createAction(types.GET_USER,
    ({id}) => id ++ // payloadCreator函数返回值，作为payload
);

// payloadCreator 为函数，返回promise作为payload
// metaCreator 为函数，返回的数据作为meta
export const getUser = createAction(types.GET_USER,
    ({id}) => request.post(types.GET_USER_URL.replace('{id}', id), {name: 111, pass: 111}),
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

1. autoShowError: 是否自动显示错误信息，如果不需要，设置为false，通过action的异步回调，自己处理异常， handle-error-plugin.js 中会用到
1. autoShowPending: 是否自动显示loading，如果不需要，设置为false，通过action回调，自己处理loading， handle-pending-plugin.js 中会用到

调用异步action，回调写法如下：

```js
this.changeHelloMessage({
    id, // 自定义请求参数
    resolve() { // 成功回调
    },
    reject() { // 失败回调
    },
});
```

### modules
modules对相应，主要针对异步，封装了`src/store/vuex-additions/handle-mutation.js`方法，具体用法如下:
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

### 本地存储
将module中某些state存入localStorage中，需要在module中添加syncToLocal配置；
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

        [types.SYNC_STATE_FROM_STORAGE](state, action) { // 这个type的action 由`/actions/app.js` 中的 `syncStateFromLocalStorage`触发
            const {payload} = action;
            if (payload.hello && payload.hello.message) {
                state.message = payload.hello.message;
            }
        },
    },
};

```
将state从localStorage中同步到系统中
`/actions/app.js` 中定义了 `syncStateFromLocalStorage` action，用于将localStorage中的state同步到项目中，默认的，项目启动时，会在`src/main.js`中触发一次`syncStateFromLocalStorage`,将所有的state同步；

如果需要单独同步具体的state，可以单独触发`syncStateFromLocalStorage`action，详见`/actions/app.js`中的实现

### 异常处理
系统通过`src/vuex-additions/handle-error-plugin.js`处理系统异常，可以截获promise异常，主要是异步产生的异常。异步action，通过的meta的autoShowError参数，可以配置是否已启用系统异常提示；
ajax请求异常，统一在`src/common/request.js`中进行截获，异常数据结构需要与后端进行约定，处理后，以promise方式返回；

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


## 关于左侧菜单
左侧菜单的选中状态，系统中根据href自动判定，不需要手动设置；
如果系统菜单跟权限相关，一般需要后端给出菜单；如果不需要权限限制，前端直接在`src/modules/app.js getSystemMenus`方法中定义即可；所需结构如下：
```js
/**
 * path: 页面路径，如果为父节点或者group节点，缺省或者写为/nothing
 * text: 菜单显示名称
 * icon: 菜单图标，可以为空
 * type: 菜单类型，父菜单还是分组菜单，可选值：group submenu 默认或缺省为：submenu
 * children: 子菜单或者分组菜单项
 */
[
    {
        // path: '/nothing',
        text: '哈喽',
        icon: 'el-icon-message',
        // type: 'group', // group submenu 默认 submenu
        children: [
            {
                path: '/',
                text: 'home',
                icon: 'el-icon-star-on',
            },
            {
                path: '/hello',
                text: 'hello',
                icon: 'el-icon-setting',
            },
            {
                path: '/login',
                text: '登录',
                icon: 'el-icon-time'
            },
            {
                path: '/nothing',
                text: '分组名称',
                icon: 'el-icon-picture',
                type: 'group',
                children: [
                    {
                        path: '/aa',
                        text: '分组一',
                    },
                    {
                        path: '/aaa',
                        text: '分组二',
                    }
                ],

            }
        ],
    },
    {
        path: '/nothing',
        text: '人员管理'
    }
]
```

如果需要自定义系统菜单状态，可以在created方法中，通过`this.$setActiveSystemMenu(path);`方法进行设置：
```js
...
created() {
    this.$setActiveSystemMenu('/hello'); // 注意，这里的参数其实是路径
}
...
```

## 关于页面头部
页面头部默认显示，当前页面标题 + 面包屑导航自动根据页面菜单状态判定；
如果需要不显示页面头部，可以在created方法中，通过`this.$hidePageHeader();`方法隐藏页面头部；
```js
...
created() {
    this.$hidePageHeader();
},
...
```

如果需要自定义页面标题，可以在created方法中，通过`this.$setPageTitle(String)`方法进行设置：
```js
...
created() {
    this.$setPageTitle('设置的title');
},
...
```

如果需要自定义面包屑导航，可以在created方法中，通过`this.$setBreadcrumb(Array)`方法进行设置：
```js
...
created() {
    this.$setBreadcrumb([
        {
            path: '/1',
            text: '自',
            icon: 'el-icon-circle-check',
        },
        {
            path: '/2',
            text: '定',
            icon: 'el-icon-upload',
        },
        {
            path: '/3',
            text: '义',
            icon: 'el-icon-picture',
        },
        {
            path: '/4',
            text: '面包屑导航',
            icon: 'el-icon-setting',
        },
    ]);
},
...
```

## TODOS

- [] 成功提示 successTip
- [] 窜页问题
- [] 查询条件封装
- [] permission 封装
- [] 列表操作列封装
- [] font-icon 封装
- [] 多次相同请求，抛弃前面几次，只保留最后一次的相关封装
