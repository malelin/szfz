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

#### 知识

1. 使用 `typeof` 判断一个变量是否存在(是否有非 `undefined` 值或者是否被声明)

   1. 如果 `a` 声明了但未赋值

   ```javascript
   // 如果声明了变量未赋值,不会报错而会继续执行if语句下面的语句
   var v
   if (v) {
     // ...
     console.log("bb")
   }
   //会执行console.log("b")输出b
   console.log("b") //b
   ```

   2. 如果 `a` 未声明

   ```javascript
   // 如果未声明变量,会报错且不会继续执行if语句下面的语句
   if (v) {
     // ...
     console.log("bb")
   }
   //不会执行console.log
   console.log("b")
   ```

   > 使用 `typeof` 判断值是否存在,无论值未声明或未赋值,接下来的代码都会执行

   ```javascript
   //var v
   if (typeof v === "undefined") {
     // ...
     console.log("bb") //bb
   }
   console.log("b") //b
   ```
