module.exports = {
    //使用的babelgongju
    "parser": "@typescript-eslint/parser",
    // 制定运行环境
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "commonjs": true,
        "jsx-control-statements/jsx-control-statements": true
    },
    //输出以及类型
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        'plugin:jsx-control-statements/recommended'
    ],
    //脚本在执行期间访问的全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    //制定解析器选项
    "parserOptions": {
        "ecmaFeatures": {
            "expperimentalObjectRestSpread": true,
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    //制定需要使用的插件
    "plugins": [
        "@typescript-eslint",
        "jsx-control-statements",
        "react",
    ],
    //启用规则以及各自的错误级别
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "linebreak-style": [0, "error", "windows"],
        "no-extra-semi": 2,//禁止多余的冒号
        "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
        "no-alert": 0,//禁止使用alert confirm prompt
        // 禁止不必要的布尔转换
        "no-extra-boolean-cast": 2,
        // 禁止不必要的括号 //(a * b) + c;//报错
        "no-extra-parens": 0,
        // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
        "default-case": 2,
        // 使用 === 替代 == allow-null允许null和undefined==
        "eqeqeq": [2,"allow-null"],
        // 禁止 if 语句中有 return 之后有 else
        "no-else-return":0,
        // 禁止扩展原生类型
        "no-extend-native":2,
        // 禁止不必要的 .bind() 调用
        "no-extra-bind":2,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        "no-implicit-globals":1,
        // 禁用魔术数字(3.14什么的用常量代替)
        "no-magic-numbers":[1,{"ignore": [0,-1,1] }],
    }
};


