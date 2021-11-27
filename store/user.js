export const state = () => {
  return {
    user: {}
  }
}

export const mutations = {
  setUser(state,user){
    state.user = user
  },
  logOut(state){
    state.user = {}
  }
}
