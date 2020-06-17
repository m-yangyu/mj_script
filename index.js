#!/usr/bin/env node
const argvStore = require('argv_store');
const devServer = require('./devServer');
const build = require('./build');
const addView = require('./add');
const deploy = require('./deploy');
const dll = require('./dll');
const services = require('./services/cli');
const {
    reactInit,
    addPlugins,
} = require('./cli');
const getOriginPlugins = require('./services/cli/sync');
const serverConfig = require('./serveConfig');
const packageJson = require('./package.json');

const program = new argvStore();

program
    .version(packageJson.version)
    .command('build', '构建', build)
    .command('build:pre', '预生产', () => build({isPre: true}))
    .command('dev', '开发', devServer)
    .command('analyz', '分析', () => build({isAnalyz: true}))
    .command('add', '添加新页面', addView)
        .options('-t --template', '添加新的页面模板')
        .options('-s --select', '直接选择需要添加的页面模板')
    .command('deploy', '部署', deploy)
    .command('build:lib', 'dll文件构建', dll)
    .command('create', '初始化', reactInit)
        .options('-r --rename', '[yourname] 重命名')
    .command('addPlugins', '添加插件', addPlugins)
        .options('-m --methods', '添加插件/框架')
        .options('-u --url', '从远处仓库拉取')
        .options('-n --npm', '从npm拉取')
        .options('-c --current', '从当前目录复制')
    .command('services', '启动服务', services)
        .options('stop', '关闭服务')
        .options('restart', '重启服务')
    .command('sync', '同步服务器的插件与框架', getOriginPlugins)
        .options('-ip', '重新设置获取服务器的ip地址')
        .options('-port', '端口号')
    .command('config', '配置', serverConfig)
        .options('set', '设置')
    .parse();