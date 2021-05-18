import MasterConfig from "../../models/config/masterConfig"

export default {
  state: () => ({
    config: new MasterConfig(),
  }),
  getters: {
    config (state: any): MasterConfig {
      return state.config
    }
  },
  mutations: {
    SET_CONFIG(state: any, payload: any) {
      state.config = payload
    },
  },
  actions: {
    setConfig({ commit }: any, data: any) {
      commit('SET_CONFIG', data)
    },
  },
}
