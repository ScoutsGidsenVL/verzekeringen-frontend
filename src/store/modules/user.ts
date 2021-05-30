import { ResponsibleMember } from '@/serializer/ResponsibleMember'

export default {
  state: () => ({
    user: {},
    loaded: false,
  }),
  getters: {
    isLoaded(state: any): boolean {
      return state.loaded
    },
    user(state: any): ResponsibleMember {
      return state.user
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
