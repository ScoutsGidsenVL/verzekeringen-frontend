import MasterConfig from "../../models/config/masterConfig"

export default {
  state: () => ({
    notifications: false,
  }),
  getters: {},
  mutations: {
    SET_NOTIFICATIONS(state: any, payload: any) {
      state.notifications = payload
    },
  },
  actions: {
    setNotifications({ commit }: any, data: any) {
      commit('SET_NOTIFICATIONS', data)
    },
  },
}
