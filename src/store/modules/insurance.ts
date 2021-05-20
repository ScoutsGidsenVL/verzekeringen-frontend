import { HolderStates } from '@/enums/holderStates'

export default {
  state: () => ({
    holderState: HolderStates.GENERAL,
  }),
  getters: {
    holderState(state: any): HolderStates {
      return state.holderState
    },
  },
  mutations: {
    SET_HOLDER_STATE(state: any, holderState: HolderStates) {
      state.holderState = holderState
    },
  },
  actions: {
    setHolderState({ commit }: any, holderState: HolderStates) {
      commit('SET_HOLDER_STATE', holderState)
    },
  },
}
