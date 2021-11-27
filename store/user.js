export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state,user){
    state.user = user
  },
  logOut(state) {
    state.user = null
  }
}
