# mj-cli

全局cli名称为：mj-cli

## 使用方法

暂时只有react的脚手架并且只有一种脚手架下载，所以只有一个命令

`mj-script create`

`mj-script create -r | --rename filename`

## 模块化

将所有的插件以模块化的方式进行管理，只有选项选中了模块，才会去进行加载对应的模块的文件，实现方式：

借用tapable的钩子，实现将项目安装过程流程化，在不同的阶段开放出不同的钩子，然后通过钩子的回调进行文件的扩展

现在有的钩子:

|钩子|类型|触发时间|
| ---- | ---- | ---- |
|startGenerator|SyncHook|初始化|
|endGenerator|SyncHook|结束构建|
|afterCreatePlugin|SyncHook|插件加载完毕|
|beforePackageJson|SyncHook|开始生成packageJSON之前|
|afterPackageJson|AsyncSeriesWaterfallHook|生成packageJSON之后|
|afterRootConfig|SyncHook|生成根目录下config文件之后|
|beforeBabelConfig|SyncHook|生成babel.config.js之前|
|afterBabelConfig|SyncHook|生成babel.config.js之后|
|beforeTemplate|SyncHook|生成template文件夹之前|
|afterTemplate|SyncHook|生成template文件夹之后|
|beforeApp|SyncHook|生成src/app.js文件之前|
|afterApp|SyncHook|生成src/app.js文件之后|
|beforeIndex|SyncHook|生成src/index.js文件之前|
|afterIndex|SyncHook|生成src/index.js文件之后|
|beforeDir|Synchook|生成src文件夹之前|
|afterDir|AsyncSeriesWaterfallHook|生成src文件夹之后|
