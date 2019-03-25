# 数字方舟

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### `.env.development`

> 配置开发环境接口地址

### `.env.production`

> 配置生产环境接口地址

### `eventbus.js` 主要用于简单的非父子组件交互通信使用

> 使用方法

```javacript
this.$eventbus.on(event: string | Array<string>, fn: Function)
this.$eventbus.emit(event: string, data: Object)
```
