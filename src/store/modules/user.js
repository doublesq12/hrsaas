import { getUserInfoApi, login,getUserDetail } from "@/api/user"

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    setToken(state, payload) {
      state.token=payload
    },
    setUserInfo(state, payload) {
      state.userInfo=payload
    }
  },
  actions: {
    //发送请求获取token
    async getToken(context, payload) {
      // console.log(payload);
      const res = await login(payload)
      console.log(res)
      // const res = 'aaaaaaaaaa'
      context.commit('setToken', res)
    },
    //获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo=await getUserDetail(userBaseInfo.userId)
        context.commit('setUserInfo', {...userBaseInfo,...userInfo})
      // }, 1000)
    }
  }
}
