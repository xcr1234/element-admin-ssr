import {matchRoles} from "~/layout-components/utils";

export default (role) => {
  if(!role){
    throw '输入参数有误！'
  }
  if(!Array.isArray(role)){
    role = [role]
  }
  return ({ store, redirect,req }) => {
    if(!store.state.user.user){
      return redirect('/login')
    }
    if(!matchRoles(store.state.user.roles,role)){
      req.session.destroy()
      return redirect('/login?fail=role')
    }
  }
}
