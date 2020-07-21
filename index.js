#!/usr/bin/env node
const argvStore = require('argv_store');
const {
    reactInit,
    addPlugins,
} = require('./build/cli');

const program = new argvStore();

program
    .version(packageJson.version)
    .command('create', '初始化', reactInit)
        .options('-r --rename', '[yourname] 重命名')
    