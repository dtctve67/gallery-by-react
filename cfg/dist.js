'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(), //用来检测相识的文件，将冗余从output中消除掉
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),//用来压缩输出js的代码
    new webpack.optimize.OccurenceOrderPlugin(),//按照引用频度来排序各个模块budler的id,引用的越频繁，且id值越短，以便达到减小文件大小的效果
    new webpack.optimize.AggressiveMergingPlugin(),//用来优化生成的代码段,合并相识的代码段，提取公共部分等
    new webpack.NoErrorsPlugin()//用来保障编译过程不能出错
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
