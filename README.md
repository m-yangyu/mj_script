# mj-script

webpack的配置，支持基本的方法

- build
- dev
- analyz

## script

### mj-script build

打包命令，在项目文件中能够通过添加`${DIR}/config/proConfig.js`文件，来替换或者新增一些新的`webpack`属性，该文件的内容会通过`webpack-merge`合并到现在已经存在的文件中

### mj-script dev

与上一个命令相似，配置文件的目录是`${DIR}/config/devConfig.js`

### mj-script analyz

会使用`webpack-build-analyz`插件生成构建文件的包大小，可以使用该命令查看对应的包大小

### mj-script build:pre

预生产环境，除了对应的环境变量有不同以外，跟生产环境不会有什么区分，同样的可以通过`${DIR}/config/preConfig.js`文件来修改对应的`webpack`参数

## 模块内容

### 持久化缓存

使用contenthash以及将moduleid设置为hash，达到持久化缓存的目的，当只有文件修改的时候才会去创建新的hash

分离runtime以及manifest文件，用于缓存

### 兼容less和sass以及cssModule

`less`和`sass`的模块化内容都可以使用，下载项目中不需要设置`less`或者`sass`，都可以直接使用

如果对应的文件中添加了module名称则会使用模块化，默认的`module：true`, 例如： `index.modlue.scss`

### gzip压缩

默认不采用gzip压缩，如果想使用的话，可以通过script设置 `ENV_GZIP=1`即可

### pxToRem

脚手架默认没有设置这个插件，如果有需求可以通过对应的文件去进行设置，虽然现在很多的都是用750的屏幕做的ui图，但是也可能会有不同，所以这边没有将转换的内容直接写入脚手架而是通过自定义的方式自行写入

### 单页与多页

目前脚手架会在`src/view`的目录下寻找是否存在`index.js`，如果存在，即构建单页的方式，如果不存在，则需要在`src/view/${yourDirName}`的文件夹中创建`index.js`实现多页打包,模板统一使用`template`文件中的内容，可通过配置文件重新设置entry来实现修正

### alisa

目前在脚手架中只有两个对应的命名缩写：

- @：对应项目文件的src目录
- ~：对应项目文件的utils目录，如果不存在这个目录需自行创建

### 开发环境跟生产环境差异

1. 开发环境是不分离css
2. 开发环境不会生成serviceWork对应的文件
3. 开发环境不会生成manifest文件
4. 开发环境不会进行gzip压缩
5. 开发环境不会对js进行压缩，但是会生成map文件

### happypack

脚手架会自动根据当前服务器的cpu去选择是否启动happypack，如果使用的机器cpu只有一个那么就不会启动happypack

### 可默认带入公用less或者sass文件

项目目录中存在`src/common`，如果存在`common.less`以及`common.scss`文件，webpack打包的时候会默认将这两个文件导入，使用的时候可以选择less或者sass来使用

### 可配置的antd的主题样式

在`src/config`目录下存在`antd.theme.js`文件，可以修改对应的样式内容

### assets

assets文件夹会被打包到`./assets`文件夹中，所以如果使用图片或者第三方静态资源的时候，可以有两手考虑

1. 使用assets，直接写相对路径
2. 使用import引入，但是文件别放在assets，不然会导致打包之后文件重复
3. 推荐在样式中使用assets的内容，减少编译

### pre-commit

如果存在`eslint`以及`jest`，那么在commit的时候会默认调用`lint`以及`test`命令，执行通过在上传代码

## 注意事项

1. 代码下载下来之后会在`src/style`目录下存在`less`跟`scss`文件，可以选择其一进行使用
2. 代码中存在很多demo文件，是否删除由各自确认
