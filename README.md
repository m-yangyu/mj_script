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
