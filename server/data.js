/**
 * 这里提供一些用作测试的数据，可以替换成你自己的数据库实现
 */
const users = [

  {
    username: 'admin',
    password: 'admin',
    roles: ['admin'],
    cnName: '管理员',
    mobile: '123456'
  },
  {
    username: 'user',
    password: 'user',
    roles: [],
    cnName: '用户',
    mobile: '111111'
  },
  {
    username: 'zhangsan',
    password: '123456',
    roles: ['zhangsan'],
    cnName: '张三',
    mobile: '111111'
  }
]

export const getUserByName = (username) => {
  return new Promise(resolve => {
    setTimeout(() => {

      const filterd = users.filter(user => user.username === username)
      if(filterd.length){
        resolve(filterd[0])
      }else{
        resolve()
      }
    },300)
  })
}

export const getAll = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users)
    },300)
  })
}
