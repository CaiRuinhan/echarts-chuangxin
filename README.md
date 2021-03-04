# 简介
*unisk-vue-mobile* 是联通时科前端APP项目基础架构，以[vue-cli3](https://github.com/vuejs/vue-cli)为构建工具，基于 [vue](https://github.com/vuejs/vue) 和 [vant](https://github.com/youzan/vant) 实现的。

## 前序准备
你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。
本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [vant](https://github.com/youzan/vant)，所有的请求数据推荐使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟。

## 开发
```
# 安装依赖
npm install

# 本项目已配置部分npmrc以解决国内网络下载失败问题，如遇到其他下载失败情况，不建议直接使用cnpm安装，请运行如下命令
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
npm run dev

# 配置文件
首先需要配置环境变量.env.development和.env.production中的VUE_APP_BASE_API，用于区别开发环境与生产环境的base api url。
更多环境变量配置请参考vue-cli配置(https://cli.vuejs.org/guide/mode-and-env.html#modes) 

需要在src/settings.js中配置网页title和开发环境中的服务端口号，不建议修改public/index.html中的title。
```

### 构建生产环境
```
npm run build
```

### 构建测试环境
```
npm run test
```

### 代码格式检查
```
npm run lint
```

### 运行单元测试
```
npm run test:unit
```

### 自定义配置
参考 [Configuration Reference](https://cli.vuejs.org/config/).

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions