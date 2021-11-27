/**
 * 为express添加session支持
 *
 * 通过nuxt.config.js配置的modules属性而引入
 *
 * 其中涉及到saveUninitialized和resave的配置，可参考
 * https://www.cnblogs.com/walkermag/p/13584960.html
 */
import express from 'express'
import session from 'express-session'

export default function ()  {

  const app  = express()
  app.use(session({
    /**
     * 一个 String 类型的字符串，作为服务器端生成 session 的签名。
     * 正式发布前请修改secret！
     */
    secret: 'element-admin',
    /**
     * 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。
     */
    name: 'vueSessionId',
    cookie: {
      /**
       * session cookie的有效期，单位为毫秒
       */
      maxAge: 3600 * 1000  //有效期1个小时
    },
    /**
     * 强制保存 session 即使它并没有变化
     * 最直观的表现就是客户端的cookie的有效期在变化；
     */
    resave: true,
    /**
     * 强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。
     */
    saveUninitialized: false
  }))

  // Add server middleware to the beginning, so that is accessible in every middleware handler:
  this.options.serverMiddleware.unshift(app);

}
