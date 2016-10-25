module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    env: {
        "browser": true,
        "node": true,
        "mocha": true,
        "jest": true,
        "es6": true
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'import/no-dynamic-require': 0,
        'import/prefer-default-export': 0,
        'no-param-reassign': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "indent": [2, 4],
        "global-require": 0,
        "react/jsx-space-before-closing": 0, // <FIcon /> 空格
        "object-curly-spacing": 0, // { 内侧空格 }
    }
}