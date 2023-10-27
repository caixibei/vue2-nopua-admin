const { defineConfig } = require('@vue/cli-service')


//! svg-sprite-loader插件
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  //! svg-sprite-loader插件
  chainWebpack: config => {
    // 排除项目默认的规则
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons')).end();
    // 新增规则
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  }
})
