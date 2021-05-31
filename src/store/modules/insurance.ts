import { HolderStates } from '@/enums/holderStates'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
export default {
  state: () => ({
    holderState: HolderStates.GENERAL,
    insuranceTypeState: InsuranceTypes.EENMALIGE_ACTIVITEIT,
    oneTimeActivityState: {},
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
    SET_ONE_TIME_ACTIVITY_STATE(state: any, oneTimeActivityState: OneTimeActivity) {
      state.oneTimeActivityState = oneTimeActivityState
    },
  },
  actions: {
    setHolderState({ commit }: any, holderState: HolderStates) {
      commit('SET_HOLDER_STATE', holderState)
    },
    setInsuranceTypeState({ commit }: any, insuranceTypeState: InsuranceTypes) {
      commit('SET_INSURANCE_TYPE_STATE', insuranceTypeState)
    },
    setOneTimeActivityState({ commit }: any, oneTimeActivityState: OneTimeActivity) {
      commit('SET_ONE_TIME_ACTIVITY_STATE', oneTimeActivityState)
    },
  },
}
