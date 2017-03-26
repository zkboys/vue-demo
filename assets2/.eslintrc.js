// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        // 一下为cli初始化之后，后添加的规则
        "indent": [2, 4], // 和ide的format冲突，这里改一下。
        "object-curly-spacing": 0, // { 内侧空格 }
        "semi": 0, // 每一行语句结束需要分号
        "comma-dangle": 0, // 类、数组，结尾元素需要逗号
        "space-before-function-paren": 0 // 方法前一个括号跟方法名之间不需要空格

    }
}
