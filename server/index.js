/**
 * 引入express的主入口
 * 所有接口都会暴露在/api/下
 *
 * 通过nuxt.config.js配置的serverMiddleware属性而引入
 */
import express from 'express'
import 'express-async-errors'   //用来捕获express中async/await方法抛出的异常
import bodyParser from "body-parser"

const app = express()


app.use(bodyParser.json()); // 添加json解析
app.use(bodyParser.urlencoded({  // 添加form解析
  extended: false
}));

import user from './api/user'

app.use('/user',user)

export default app
