const webpack = require('webpack')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

const plugins = [new webpack.WatchIgnorePlugin([/module\.\w+\.d\.ts$/])]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new TypedocWebpackPlugin(
      {
        target: 'esnext',
        module: 'esnext',
        mode: 'modules',
        ignoreCompilerErrors: true,
        out: '../docs'
      },
      './src'
    )
  )
}
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-tsx-admin-template/' : '/',
  configureWebpack: {
    plugins
  },
  chainWebpack(config) {
    // 忽略提示
    // ignoreCssWarnings(config);
    // css to typings-for-css-modules-loader
    ;['css', 'less', 'scss', 'sass', 'stylus', 'postcss'].forEach(rule => {
      // rules for *.module.* files
      const cssRule = config.module
        .rule(rule)
        .oneOf('normal-modules')
        .uses.get('css-loader')
        .set('loader', 'typings-for-css-modules-loader')
    })
  },
  css: {
    loaderOptions: {
      css: {
        namedExport: true,
        camelCase: true,
        localIdentName:
          process.env.NODE_ENV !== 'production' ? '[local]-[hash:base64:5]' : '[hash:base64:5]'
      }
    }
  },
  transpileDependencies: ['vuex-module-decorators'],
  pwa: {
    name: 'vue-tsx-admin-template'
  },

  lintOnSave: process.env.NODE_ENV !== 'production'
}
