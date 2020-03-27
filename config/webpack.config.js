const os = require('os');
const fs = require('fs');
const webpack = require('webpack');
const { outputDIR, sourceDIR, DIR } = require('./static');
const { htmlPlugin, entryObj } = require('./public/entry');
const Ext = require('./alisa/ext');
const aliasConfig = require('./alisa');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const manifestPlugin = require('webpack-manifest-plugin');

const cssReg = /\.css$/;
const sassModuleReg = /\.module\.(scss|sass)$/;
const sassReg = /\.scss|.sass$/;
const lessModuleReg = /\.module\.less/;
const lessReg = /\.less$/;

const hasHappyPack = os.cpus().length > 1;
const hasAntdTheme = fs.existsSync(`${DIR}/antd.theme.js`);

module.exports = function(env) {

    const isDev = env === 'development';
    const isPro = env !== 'development';
    const isLess = fs.existsSync(`${DIR}/src/style/common.less`);
    const isSass = fs.existsSync(`${DIR}/src/style/common.scss`);
    const ENV_GZIP = process.env.ENV_GZIP;
    const isDll = fs.existsSync(`${DIR}/lib/lib.js`);
    const isEslint = fs.existsSync(`${DIR}/.eslintrc.js`);

    const styleLoader = (cssOptions = {}) => {
        return [
            isDev && {
                loader: 'style-loader'
            },
            isPro && {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: cssOptions
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            }
        ].filter(Boolean)
    }

    const getLessLoader = () => {
        return [
            'less-loader',
            isLess && {
                loader: 'sass-resources-loader',
                options: {
                    resources: [`${sourceDIR}/style/common.less`]
                }
            }
        ].filter(Boolean);
    }

    const getSassLoader = () => {
        return [
            'sass-loader',
            isSass && {
                loader: 'sass-resources-loader',
                options: {
                    resources: [`${sourceDIR}/style/common.scss`]
                }
            }
        ].filter(Boolean);
    }

    return {
        entry: {
            ...entryObj
        },
        mode: env === 'development' ? env : 'production',
        output: {
            path: outputDIR,
            // contenthash 以文件内容为hash值，确保文件变化的时候才会改变hash
            filename: 'js/[name].[contenthash:8].js',
            chunkFilename: 'js/[name].[contenthash:8].js',
            publicPath: './'
        },
        resolve: {
            extensions: Ext,
            alias: aliasConfig,
        },
        plugins: [
            ...htmlPlugin,
            isPro && new MiniCssExtractPlugin({
                filename: 'styles/[name].[hash].css'
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([{
                from: `${DIR}/src/assets`,
                to: './assets'
            }]),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            }),
            hasHappyPack && new HappyPack({
                id:'babel',
                loaders:[{
                    loader: 'babel-loader',
                    cache: true,
                    query: {
                        configFile: `${DIR}/babel.config.js`
                    }
                }],
            }),
            // 设置service work
            isPro && new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            }),
            // 忽略moment中的不必要的语言包
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 生成环境上放出manifest
            isPro && new manifestPlugin({
                fileName: 'manifest.json',
            }),
            isPro && 
            ENV_GZIP &&
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                threshold: 10240,
                minRatio: 0.8
            }),
            isDll && 
            new webpack.DllReferencePlugin({
                context: DIR,
                manifest: require(`${DIR}/lib/manifest.json`)
            })
        ].filter(Boolean),
        optimization: {
            minimize: isPro,
            minimizer: [
                // 替换的js压缩
                new TerserPlugin({
                    cache: true,
                    extractComments: false
                }),
                // 压缩css
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                })
            ],
            // 修改文件的ids的形成方式，避免单文件修改，会导致其他文件的hash值变化，影响缓存
            moduleIds: 'hashed',
            splitChunks: {
                // 可在异步跟非异步当中共享模块
                chunks: 'all',
                minSize: 30000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    },
                },
            },
            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
        },
        module: {
            rules: [
                // 文件的提前eslint检测
                isEslint && {
                    test: /\.js|jsx/,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: {
                        cache: true,
                        formatter: require('eslint-friendly-formatter'),
                        fix: true,
                        failOnError: true,
                        configFile: `${DIR}/.eslintrc.js`
                    },
                    include: sourceDIR
                },
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        hasHappyPack ?{
                            loader: 'happypack/loader?id=babel'
                        } : {
                            loader: 'babel-loader',
                            options: {
                                configFile: `${DIR}/config/babel.config.js`
                            }
                        }
                    ].filter(Boolean),
                    exclude: [/node_modules/],
                    include: sourceDIR,
                },
                {
                    test: cssReg,
                    use: styleLoader(),
                    include: sourceDIR
                },
                {
                    test: /\.(jpg|jpeg|png|svg|bmp)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name:'static/image/[name].[ext]'
                        }
                    },
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    loader: "url-loader",
                    options: {
                    limit: 1000, // 
                      name: "[name]-[hash:5].min.[ext]",
                      publicPath: "/static/fonts/",
                      outputPath: "/static/fonts/"
                    }
                },
                {
                    // 设置module与非module形式都支持，根据文件名称区分，文件写了[name].module.scss或者[name].module.less即支持module
                    oneOf: [
                        {
                            test: sassModuleReg,
                            use: [
                                ...styleLoader({
                                    modules: true
                                }),
                                ...getSassLoader()
                            ],
                            include: sourceDIR
                        },
                        {
                            test: lessModuleReg,
                            use: [
                                ...styleLoader({
                                    modules: true
                                }),
                                ...getLessLoader()
                            ],
                            include: sourceDIR
                        },
                        {
                            test: sassReg,
                            use: [
                                ...styleLoader(),
                                ...getSassLoader()
                            ],
                            include: sourceDIR
                        },
                        {
                            test: lessReg,
                            use: [
                                ...styleLoader(),
                                ...getLessLoader()
                            ],
                            include: sourceDIR
                        },
                        {
                            test: lessReg,
                            use: [
                                ...styleLoader(),
                                {
                                    loader: 'less-loader',
                                    options: {
                                        modifyVars: hasAntdTheme ? require(`${DIR}/config/antd.theme.js`) : {},
                                        javascriptEnabled: true
                                    }
                                }
                            ],
                            include: /node_modules/
                        }
                    ]
                }
            ].filter(Boolean)
        }
    }
}