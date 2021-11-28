const getMiddleware =  (role) => {
  return (req,res,next) => {
    if(!req.session.user){
      res.status(401)
      return res.json({
        ok: false,
        msg: '接口需要登录'
      })
    }
    if(!req.session.user.roles || req.session.user.roles.indexOf(role) === -1){
      res.status(401)
      return res.json({
        ok: false,
        msg: '用户权限不足'
      })
    }
    next()
  }
}

export const roleAdmin = getMiddleware('admin')

export default getMiddleware
