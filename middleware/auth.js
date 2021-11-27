export default  ({ store, redirect }) => {
  if (!store.state.user.user) {
    return redirect('/login')
  }
}
