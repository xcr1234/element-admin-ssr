import Vue from 'vue'

/**
 * 首页菜单和路径配置
 */
const dashBoardMenu = {
  path: '/',
  meta:{
    title: '首页',
    icon: 'dashboard'
  }
}

//确保首页不可关闭
dashBoardMenu.meta.notClose = true

const rootConfig = {
  dashBoardMenu,
  menus: [
    dashBoardMenu,
    {
      path: '',
      meta:{
        title: '菜单',
        icon: 'edit'
      },
      children: [
        {
          path: '/test1',
          meta:{
            title: '菜单1',
            icon: 'dashboard'
          }
        },
        {
          path: '/test2',
          meta:{
            title: '菜单2',
            icon: 'lock'
          }
        },
        {
          path: '/admin',
          meta:{
            title: '管理员菜单',
            icon: 'lock',
            role: ['admin']
          }
        }
      ]
    },
    {
      path: 'https://www.baidu.com/',
      meta:{
        title: '外链',
        icon: 'link'
      }
    },
  ],
  notCacheMenus: []
}


Vue.prototype.$rootConfig = rootConfig

export default rootConfig
