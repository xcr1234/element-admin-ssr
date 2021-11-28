export default (req,res,next) => {
  if(!req.session.user){
    res.status(401)
    return res.json({
      ok: false,
      msg: '接口需要登录'
    })
  }
  next()
}
