// webpack.config.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入CleanWebpackPlugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: __dirname + "/src/main.js", // 入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./dist", // 本地服务器所加载文件的目录
        port: "8088",   // 设置端口号为8088
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true, //不跳转
        hot: true //热更新
    },
    devtool:'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
    module: {
        rules: [
            // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(scss|sass)$/,use: ['style-loader', 'css-loader', 'sass-loader'] },// 处理 less 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        //new CleanWebpackPlugin(),  // 所要清理的文件夹名称
        new webpack.HotModuleReplacementPlugin(), //热更新插件
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
          "vue$": "vue/dist/vue.js"
        }
      },
      performance: {
        hints:'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    }
}