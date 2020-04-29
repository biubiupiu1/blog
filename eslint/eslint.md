[参考链接](https://juejin.im/post/5de8f14ff265da33f9794489)

### 项目中集成其他规则的方法

+ 使用 npm 包
  ![](http://dev.biubiupiu.cn/20200428101339.png)

+ extends 继承插件配置
  ![](http://dev.biubiupiu.cn/20200428101441.png)
  ![](http://dev.biubiupiu.cn/20200428101509.png)

````javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
````

> 上面这段配置是 vue-cli3 生成的和 prettier 结合的配置

+ `plugin:vue/essential` 是 vue 的 eslint 插件

````javascript
// eslint-plugin-vue 包
// eslint-plugin-vue/lib/essential.js
module.exports = {
  extends: require.resolve('./base'),
  rules: {
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-dupe-keys': 'error',
    ....
  }
}
````

+ `eslint:recommended` 是 eslint 自己的标准规则
  
+ `@vue/prettier` 是 vue 结合 prettier 的一个配置
  
````javascript
// @vue/eslint-config-prettier 包
module.exports = {
  plugins: ['prettier'],
  extends: [
    require.resolve('eslint-config-prettier'),
    require.resolve('eslint-config-prettier/vue')
  ],
  rules: {
    'prettier/prettier': 'warn'
  }
}
````

> 上面继承了配置 eslint-config-prettier 和 eslint-config-prettier/vue ,

````javascript
// eslint-config-prettier
const includeDeprecated = !process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED;
module.exports = {
  rules: Object.assign(
    {
      "array-bracket-newline": "off",
      "array-bracket-spacing": "off",
      "array-element-newline": "off",
      "arrow-parens": "off",
      ....
    },
    includeDeprecated && {
      // Deprecated since version 4.0.0.
      // https://github.com/eslint/eslint/pull/8286
      "indent-legacy": "off",
      // Deprecated since version 3.3.0.
      // https://eslint.org/docs/rules/no-spaced-func
      "no-spaced-func": "off",
    }
  ),
};
````

> 这个包规则关闭了和 eslint 冲突的规则 eslint-config-prettier/vue 也是一样的

> 上面还使用了 prettier 插件，eslint-plugin-prettier 插件将 prettier 规则应用到 eslint 提示中，下面的 prettier/prettier: 'warn' 代表 prettier 格式错误的时候在 eslint 提示警告