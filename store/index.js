import rootConfig from "~/plugins/root-config";

export const actions = {
  nuxtServerInit({commit}, {req,app}) {
    if (req.session.user) {
      commit('user/setUser', req.session.user)
      const roles = req.session.user.roles || []
      commit('user/setRoles',roles)
      commit('app/calcUserMenus',{
        menus:rootConfig.menus,
        roles
      })
    }
  }
}
