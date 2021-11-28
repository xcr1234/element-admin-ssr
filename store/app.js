import {calcMenus} from "~/layout-components/utils";


export const state = () => {
  return {
    breadcrumb: [],
    tags:[],
    excludeCaches: [],
    sideBarOpen: true,
    menus: []
  }
}


export const mutations = {
  updateBreadcrumb(state,breadcrumb){
    state.breadcrumb = breadcrumb
  },
  addTag(state,tag){
    if((state.tags.filter(t => t.path === tag.path)).length === 0){
      state.tags.push(tag)
    }
  },
  setExcludeCache(state,val){
    state.excludeCaches = val
  },
  removeTag(state,index){
    state.tags.splice(index,1)
  },
  toggleSideBar(state){
    state.sideBarOpen = !state.sideBarOpen
  },
  clearTag(state){
    //清除标签，仅保留第一个（首页）
    state.tags.splice(1)
  },
  calcUserMenus(state,{menus,roles}){
    state.menus = calcMenus(menus,roles)
  }
}
