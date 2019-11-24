const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

//把相同样式合并插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 把过大的CSS文件拆分插件
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const commonConfig = require('./webpack.common.js');

//压缩js插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//压缩js的另外一种插件，只不过是多个子进程同时压缩，效率相对于上面那种效率更高一些
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

//自动把分包的东西添加至html
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = merge(commonConfig, {
    mode: 'production', // 设置Webpack的mode模式
    devtool: 'cheap-module-eval-source-map', //生产 环境设置SoureMap的模式，方便调试
    output: {
        filename: 'js/[name].[contenthash].js', // entry对应的key值
        chunkFilename: 'js/[name].[contenthash].js', // 间接引用的文件会走这个配置
        publicPath: '/webpack-sample-step11/dist/', // 指定存放静态资源的CDN地址
    },
    optimization: {
        minimizer: [
            new ParallelUglifyPlugin({ // 多进程压缩
                    uglifyJS: {
                        warnings: false,
                        output: {
                            comments: false,
                            beautify: false,
                        },
                        compress: {
                            drop_console: true,
                            collapse_vars: true,
                            reduce_vars: true,
                        },
                    },
                }
            ),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         cache: true, // 开启文件缓存
            //         parallel: true, // 使用多进程并行来提高构建速度
            //         sourceMap: true, // 开启source map
            //         warnings: false, // 在UglifyJS删除没有用到的代码时不输出警告
            //         compress: {
            //             drop_console: true, // 删除所有的console语句
            //             collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            //             reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
            //         },
            //         output: {
            //             beautify: false, // 最紧凑的输出
            //             comments: false, // 删除所有的注释
            //         },
            //     },
            // }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
        ],
    },
    // 生产环境下需要的相关插件配置
    plugins: [
        //将分包文件添加至html文件的插件
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../static/dll/vendors.dll.js'), // 对应的 dll 文件路径
        }),

        //压缩css，并且把相同的样式合并
        new CSSSplitWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true, },
                autoprefixer: false,
                map: { inline: false, annotation: true, },
            },
            canPrint: true,
            size: 4000,
            filename: '[name]-[part].[ext]',
        }),
    ],
})


