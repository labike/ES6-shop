const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

const getHtmlConfig = function(name, title){
    return{
        template: './src/views/' + name + '.html',
        filename: 'views/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: [
            "common",
            name
        ]
    }
}

const config = {
  entry: {
    'common': ['./src/pages/common/index.js'],
    'index': ['./src/pages/index/index.js'],
    'user-login': ['./src/pages/user-login/index.js'],
    'user-register': ['./src/pages/user-register/index.js'],
    'user-passreset': ['./src/pages/user-passreset/index.js'],
    'user-passupdate': ['./src/pages/user-passupdate/index.js'],
    'user-center': ['./src/pages/user-center/index.js'],
    'user-centerupdate': ['./src/pages/user-centerupdate/index.js'],
    'list': ['./src/pages/list/index.js'],
    'detail': ['./src/pages/detail/index.js'],
    'cart': ['./src/pages/cart/index.js'],
    'order-confirm': ['./src/pages/order-confirm/index.js'],
    'order-list': ['./src/pages/order-list/index.js'],
    'order-detail': ['./src/pages/order-detail/index.js'],
    'order-payment': ['./src/pages/order-payment/index.js'],
    'result': ['./src/pages/result/index.js']
  },
  externals: {
      jquery: 'jQuery'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//os4team.cn/dist/',
    filename: 'js/[name].js'
  },
  resolve: {
      alias: {
          utils: __dirname + '/src/utils',
          pages: __dirname + '/src/pages',
          service: __dirname + '/src/service',
          image: __dirname + '/src/image'
      }
  },
  module: {
      rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
          },
          {
            test: /\.string$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            }]
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }) 
          },
          {
            test: /\.(jpg|png|gif|jpeg)\??.*$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
          },
          {
            test: /\.(ttf|woff|eot|svg|otf|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        }
      ]
  },
  plugins: [
    //通用模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/common.js',
    }),
    //css单独打包
    new ExtractTextPlugin("css/[name].css"),
    //html
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-passreset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-centerupdate', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-passupdate', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlConfig('order-payment', '订单支付')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '提示'))
  ],
  devServer: {
    port: 8088,
    historyApiFallback: {
        index: '/dist/views/index.html'
    },
    proxy: {
        '/': {
            target: '',
            changeOrigin: true
        }
    }
  }
}

module.exports = config
