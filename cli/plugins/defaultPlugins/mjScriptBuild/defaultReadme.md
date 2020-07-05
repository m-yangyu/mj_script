# mj_react

标准的react模板，内置多个模块，可减少搭建成本以及时间

## axios

`src/common`中存在http.js文件，内涵简单的针对封装，以及使用redux-thunk的http请求封装

## less/scss

可以使用less也可以使用scss，同时支持模块化，只需要在名称处做修改

模块化： index.module.scss | index.module.less
非模块化： index.scss | index.less

`src/style`文件夹中存在common文件，可以定义一些less或者scss的通用样式

## antd

使用了antd4.0

## react生态

包含了redux以及react-router

redux封装在`src/redux`文件中
react-router封装在`src/router`文件夹中

## config文件夹

这里面有4个配置文件，分别对应为

antd.theme.js：antd的样式设置
devConfig.js：开发环境的webpack配置
preConfig.js：预生产环境的webpack配置
proConfig.js：生产环境的webpack配置

## deploy

一键自动化部署，可以直接部署至对应的服务器中，但是需要在服务器中安装depolyer这个node服务，同时配置`config/deploy.js`文件中的服务器ip地址以及port

暂时deployer是只支持单机构建，也就是只有一个构建命令，没有开放出去多余的命令，即：

1. 快速部署至线上
2. 只适合个人项目使用，多人合作流程使用不顺畅

[deployer](https://github.com/HuskyToMa/depolyer) git地址

```javascript

{
    host: 'localhost',  // ip地址
    port: '8000',       // 端口
    url: '/depoly'      // 发送出来的构建接口，可修改，默认的deployer使用的是这个参数
}

```
