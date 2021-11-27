const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin');


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'element-admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    //'element-ui/lib/theme-chalk/index.css'
    '@/styles/normalize.css',
    '@/styles/element.css',
    '@/styles/index.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/svg-icon',
    '@/plugins/root-config'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '~/server/session.js'
  ],

  serverMiddleware: {
    '/api': '~/server'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extend (config, { isServer,isDev }) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/icons/svg')]
      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [path.resolve(__dirname, 'assets/icons/svg')], //将存放svg的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader',options: {symbolId: 'icon-[name]'}}]
      })

      if(isServer && !isDev){
        const keepDirectory = ['.nuxt','assets','plugins','server','styles','static']
        const keepFiles = ['nuxt.config.js','package.json','*.lock','.gitignore']
        config.plugins.push(new FileManagerPlugin({
          events:{
            onStart:{
              delete: ['dist/']
            },
            onEnd:{
              copy:[
                ...keepDirectory.map(item => {
                  return {
                    source: item,
                    destination: 'dist/' + item
                  }
                }),
                ...keepFiles.map(item => {
                  return {
                    source: item,
                    destination: 'dist/'
                  }
                })
              ]
            }
          }
        }))
      }
    }
  }
}
