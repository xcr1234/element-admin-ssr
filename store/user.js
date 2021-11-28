export const state = () => {
  return {
    user: null,
    roles: []
  }
}

export const mutations = {
  setUser(state,user){
    state.user = user
  },
  setRoles(state,roles){
    state.roles = roles
  },
  logOut(state) {
    state.user = null
  }
}
