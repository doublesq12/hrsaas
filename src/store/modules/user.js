import { login } from "@/api/user"

export default {
  namespaced: true,
  state: {
    token:''
  },
  mutations: {
    setToken(state, payload) {
      state.token=payload
    }
  },
  actions: {
    //发送请求获取token
    async getToken(context, payload) {
      // console.log(payload);
      const res = await login(payload)
      console.log(res)
      // const res = 'aaaaaaaaaa'
      context.commit('setToken',res)
    }
  }
}
