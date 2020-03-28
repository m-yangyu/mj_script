const fs = require('fs');
const path = require('path');
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

class Generator {
    constructor() {
        this.hooks = {
            startGenerator: new SyncHook('startGenerator'),
            endGenerator: new SyncHook('endGenerator'),
            afterCreatePlugin: new SyncHook('afterCreatePlugin'),
            beforePackageJson: new SyncHook('beforePackageJson'),
            afterPackageJson: new SyncWaterfallHook('afterPackageJson'),
        }
    }
}

module.exports =  Generator;