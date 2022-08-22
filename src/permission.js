import router,{asyncRoutes} from '@/router'
import store from '@/store'
//路由全局前置首位
const whiteList=['/login','/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
      const { roles} = await store.dispatch('user/getUserInfo')
      console.log(roles.menus);
      // console.log(asyncRoutes)
      console.log(roles.points)
      await store.dispatch('permission/filterRoutes', roles)
      await store.dispatch('permission/setPointsAction',roles.points)
      next(to.path)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})