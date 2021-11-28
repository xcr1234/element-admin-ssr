export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const match = (nodePathArray,menu,path) => {
  for (let index = 0; index < menu.length; index++) {
    const item = menu[index]
    if(item.children){
      let endRecursiveLoop = match(nodePathArray,item.children, path)
      if (endRecursiveLoop) {
        nodePathArray.push(item)
        return true
      }
    }
    if (item.path === path) {
      nodePathArray.push(item)
      return true
    }
  }
}
/**
 * 根据菜单树匹配，返回命中路径数组
 * @param menu
 * @param path
 * @returns {*[]}
 */
export const matchPathMenu = (menu,path) => {
  const nodePathArray = []
  match(nodePathArray,menu,path)
  return nodePathArray.reverse()
}
/**
 * 根据key销毁组件，并且清除Keepalive的缓存
 * 参考：https://zhuanlan.zhihu.com/p/40374425
 * @param keepalive keepalive的vnode实例，通过组件.$vnode.parent返回
 * @param key 被删除的组件key
 */
export const destroyKeepalive = (keepalive,key) => {

  const cache = keepalive.componentInstance.cache
  const keys = keepalive.componentInstance.keys
  if(cache[key]){
    if (keys.length) {
      const kIndex = keys.indexOf(key);
      if (kIndex > -1) {
        keys.splice(kIndex, 1);
      }
    }
    const instance = cache[key].componentInstance
    delete cache[key]
    instance.$destroy()
  }
}


export const isMobile = () => {
  return /Android|webOS| iPhone | iPad | iPod |BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test(
    navigator.userAgent)
}

export const matchRoles = (userRoles,roles) => {
  for(let role of roles){
    if(userRoles.indexOf(role) > -1){
      return true
    }
  }
  return false
}

export const calcMenus = (menus,roles) => {
  const result = []
  menus.forEach(menu => {
    const obj = {...menu}
    if(menu.children){
      obj.children = calcMenus(menu.children,roles)
    }
    if(!menu.meta.role || matchRoles(roles,menu.meta.role)){
      result.push(obj)
    }
  })
  return result
}
