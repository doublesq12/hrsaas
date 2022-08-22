import router,{ constantRoutes ,asyncRoutes} from "@/router"
export default {
  namespaced: true,
  state: {
    routes: [],
    points:[]
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes=[...constantRoutes,...routes]
    },
    setPoints(state, payload) {
      state.points=payload
    }
  },
  actions: {
    filterRoutes(context,roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item.meta.id)
        return roles.menus.includes(item.meta.id)
      })
      console.log(routes)
      context.commit('setRoutes',routes)
      router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
    },
    setPointsAction(context, points) {
      context.commit('setPoints',points)
    }
  }
}