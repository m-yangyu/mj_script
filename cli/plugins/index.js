const path = require('path');
const fs = require('fs');
const fsE = require('fs-extra');
const { copyFile, writeFile, mkdir } = require('../tools/files');
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable')

const modulesLoad = () => {
    // 生成packageJSON
    // 生成根目录配置文件
    // 生成babel
    // 生成template文件夹（html）
    // 生成config配置文件（直接复制，不写入）
    // 生成src
    //      - 生成app.jsx
    //      - 生成index.js
    //      - 生成src目录表级别文件夹(common, components, assets)
    //      - 生成view
    //      - 生成style文件夹

}


module.exports = modulesLoad;