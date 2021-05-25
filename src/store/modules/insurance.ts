import { HolderStates } from '@/enums/holderStates'
import { InsuranceTypes } from '@/enums/insuranceTypes'

export default {
  state: () => ({
    holderState: HolderStates.GENERAL,
    insuranceTypeState: InsuranceTypes.EENMALIGE_ACTIVITEIT,
  }),
  getters: {
    holderState(state: any): HolderStates {
      return state.holderState
    },
    insuranceTypeState(state: any): InsuranceTypes {
      return state.insuranceTypeState
    },
  },
  mutations: {
    SET_HOLDER_STATE(state: any, holderState: HolderStates) {
      state.holderState = holderState
    },
    SET_INSURANCE_TYPE_STATE(state: any, insuranceTypeState: InsuranceTypes) {
      state.insuranceTypeState = insuranceTypeState
    },
  },
  actions: {
    setHolderState({ commit }: any, holderState: HolderStates) {
      commit('SET_HOLDER_STATE', holderState)
    },
    setInsuranceTypeState({ commit }: any, insuranceTypeState: InsuranceTypes) {
      commit('SET_INSURANCE_TYPE_STATE', insuranceTypeState)
    },
  },
}
