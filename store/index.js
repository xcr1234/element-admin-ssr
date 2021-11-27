export const actions = {
  nuxtServerInit({commit}, {req}) {
    if (req.session.user) {
      commit('user/setUser', req.session.user)
    }
  }
}
