const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

module.exports = merge(commonConfig, {
    mode: 'development', // 设置webpack mode的模式
//使用Webpack打包的项目，编译到/dist目录中的[name].bundle.js代码已被重新混淆。如果出现错误，
// 无法将错误正确定位到原始代码对应位置，这样不便于我们调试代码。如果需要精确调试生产环境代码，
// 我们就需要在Webpack中配置SourceMap相关的配置。
    devtool: 'cheap-module-eval-source-map', // 开发环境设置SoureMap的模式，方便调试
    // 开发环境下需要的相关插件配置
    plugins: [
        new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新著作权归作者所有。
    ],

    output: {
        filename: 'js/[name].bundle.js', // 创建的bundle的名称
        chunkFilename: 'js/[name].bundle.js',
        sourceMapFilename: 'js/[name].bundle.js.map', // 创建的SourceMap的文件名
        publicPath: '/', // 指定存放静态资源的CDN地址
    },
    // 开发服务器
    devServer: {
        hot: true,                  // 热更新，无需手动刷新
        contentBase: DIST_PATH,     //
        // host: '0.0.0.0',            // host地址,不能加这个，不然会打不开文件
        port: 8080,                 // 服务器端口
        historyApiFallback: true,   // 该选项的作用所用404都连接到index.html
        proxy: {
            "/api": "http://localhost:3000" // 代理到后端的服务地址，会拦截所有以api开头的请求地址
        },
        overlay: { // 当出现编译错误或警告时，就在页面上显示一层黑色的背景层和错误信息
            errors: true,
        },
        inline: true,
    }
})


