const webpack = require('webpack');
const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');







//将路径转换为绝对路径,优化查找速度
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}


module.exports = {
    // 入口JS路径
    // 指示Webpack应该使用哪个模块，来作为构建其内部依赖图的开始
    entry: {
        index: path.resolve(__dirname, '../src/pages/index/index.tsx'),
    },
    performance: { // 性能提示，可以提示过大文件
        hints: 'warning', // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
        maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename);
        },
    },
    // 编译输出的JS入路径
    // 告诉Webpack在哪里输出它所创建的bundle，以及如何命名这些文件
    output: {
        path: DIST_PATH,        // 创建的bundle生成到哪里
        // 创建的bundle的名称,添加hash，清除浏览器缓存,但是会有一个问题，
        // 那就是每次run dev都会生成一个新的js文件，名字不同，会导致文件越来越多，需要清理
        // filename: '[name].bundle.[hash].js',
        // sourceMapFilename: '[name].js.map', // 创建的SourceMap的文件名,方便调试
        //
        // // 网页中总是会使用到一些静态资源，将这些静态资源部署到CDN服务上，
        // // 使用得用户可以就近访问资源，加快访问速度。在Webpack中，
        // // 我们可以通过publicPatch来配置CDN服务器对应的URL。
        // publicPath: '/'//指定静态资源存放的地址
    },

    resolve: {
        // 配置之后可以不用在require或是import的时候加文件扩展名，会依次尝试添加扩展名进行匹配
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
        modules: [
            resolve('src'),
            resolve('node_modules'),
        ],
        //配置别名，可以使用@引入，在ts环境中还需要在tsconfig.json里面继续配置别名
        alias: {
            '@': resolve('src'),
            '@components': resolve('src/components'),
            '@pages': resolve('src/pages'),
            '@images': resolve('src/assets/images'),
            '@fonts': resolve('src/assets/fonts'),
            '@icons': resolve('src/assets/icons'),
        }
    },

    // 模块解析
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,//排除不处理的目录
                include: resolve('src'),//精确指定要处理的目录
                use: [
                    {
                        loader: "babel-loader?cacheDirectory"
                    },
                    {
                        loader: "awesome-typescript-loader"
                    },
                    {
                        loader: "eslint-loader",//eslint的启用
                        options: {
                            formatter: require('eslint/lib/cli-engine/formatters/stylish')//解决报错
                        },
                    },
                ],
            },

            // CSS Loader
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /node_modules/,
                include: resolve('src'),
                use: [
                    process.env.NODE_ENV !== 'dev'
                        ? MiniCssExtractPlugin.loader
                        : ['css-hot-loader', 'style-loader'],
                    {
                        loader: "css-modules-typescript-loader",
                        options: {
                            namedExport: true,
                            camelCase: true,
                            sass: true,
                            modules: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            // images loader
            {
                test: /\.(png|gif|svg|webp)$/,
                exclude: /node_modules/,//排除不处理的目录
                include: resolve('src'),//精确指定要处理的目录
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,                        // 小于10kb的图片编译成base64编码，大于的单独打包成图片
                            name: "images/[hash]-[name].[ext]", // Placeholder占位符
                            publicPath: "assets",               // 最终生成的CSS代码中，图片URL前缀
                            outputPath: "assets",               // 图片输出的实际路径（相对于/dist目录）
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {enabled: false,},
                            pngquant: {quality: [0.65, 0.9], speed: 4,},
                            gifsicle: {
                                interlaced: false
                            }, // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            },
                        },
                    },
                ]
            },

            //字体图标,为什么把jpg也放进来，是因为在css使用的背景图根路径是相对于dist下的css
            //而在tsx引入的则是相对于dist根目录，所以背景图格式就放在了这里
            {
                test: /\.(woff2?|eot|jp(e*g)|ttf|otf)(\?.*)?$/,
                exclude: /node_modules/,//排除不处理的目录
                include: resolve('src'),//精确指定要处理的目录
                use: [{
                    loader: "url-loader", options: {
                        limit: 1024, // 小于10kb的字体编译成base64编码
                        name: "fonts/[hash]-[name].[ext]", // Placeholder占位符
                        publicPath: "../assets", // 最终生成的CSS代码中，字体URL前缀
                        outputPath: "assets"// 字体输出的实际路径（相对于/dist目录）
                    }
                }
                ]
            }

        ]
    },

    // 插件
    plugins: [
        //css会打包进js文件中，所以这里使用这个插件单独抽出来css文件，优化css，提高页面效率
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name]-[id].[hash].css',
        }),
        //清除dist里面的打包多余文件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
                inject: false,
                template: HtmlWebpackTemplate,
                appMountId: 'root',
                filename: 'index.html',
                minify: {
                    removeComments: true, // 去掉注释
                    collapseWhitespace: true, // 去掉多余空白
                    removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo },
                }
            }
        )
    ]
}

