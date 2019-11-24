const webpack = require('webpack');
const path = require('path');
//清包
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    //环境
    mode: 'production',
    //要分包的包
    entry: {
        vendors: ['react', 'react-dom'],
    },
    //输出目录
    output: {
        path: path.resolve(__dirname, '../static/dll'),
        filename: '[name].dll.js',
        library: '[name]_lib',
        libraryTarget: 'var',
        pathinfo: true,
    },
    //插件
    plugins: [
        //清除
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, '../static/dll/**/*')
            ],
        }),
        //使用分包插件
        new webpack.DllPlugin({
                path: path.resolve(__dirname, '../static/dll', '[name]-manifest.json'),
                name: '[name]_lib', context: process.cwd(),
                context: path.resolve(__dirname),
            }
        ),
    ],
};


