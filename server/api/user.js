import express from 'express'
import {getAll, getUserByName} from "../data";
import {roleAdmin} from "../middleware/role"


const router = express.Router()


router.post('/login',(async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if(!username || !password){
    return res.json({
      ok: false,
      msg: '输入有误！'
    })
  }

  const user = await getUserByName(username)
  if(!user){
    return res.json({
      ok: false,
      msg: '用户不存在！'
    })
  }

  if(user.password !== password){
    return res.json({
      ok: false,
      msg: '用户密码不正确！'
    })
  }

  //不要把用户密码返回到前端
  const returnUser = {
    ...user,
    password: null
  }

  req.session.user = returnUser


  return res.json({
    ok: true,
    msg: 'ok',
    data: returnUser
  })

}))


router.get('/logout',((req, res) => {
  req.session.destroy()
  return res.json({
    ok: true
  })
}))

router.get('/list',roleAdmin,(async (req, res) => {
  const users = await getAll()
  return res.json(users.map(u => {
    return {
      ...u,
      password: null
    }
  }))
}))



export default router
