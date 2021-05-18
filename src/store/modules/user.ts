import UserModel from '../../models/userModel'

export default {
  state: () => ({
    user: new UserModel(),
    loaded: false,
  }),
  getters: {
    isLoaded(state: any): boolean {
      return state.loaded
    },
  },
  mutations: {
    SET_USER(state: any, payload: any) {
      state.user = payload
    },
    SET_LOADED(state: any, payload: any) {
      state.loaded = payload
    },
  },
  actions: {
    setUser({ commit }: any, data: any) {
      commit('SET_USER', data)
    },
    setLoaded({ commit }: any, data: any) {
      commit('SET_LOADED', data)
    },
  },
}
