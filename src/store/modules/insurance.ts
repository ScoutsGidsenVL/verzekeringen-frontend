import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import { InsuranceTypes, InsuranceTypeStoreNames } from '@/enums/insuranceTypes'
import { HolderStates } from '@/enums/holderStates'
import { NonMemberInsurance } from '@/serializer/insurances/NonMemberInsurance'

export default {
  state: () => ({
    holderState: HolderStates.GENERAL,
    insuranceTypeState: InsuranceTypes.EENMALIGE_ACTIVITEIT,
    generalInsuranceState: {},
    oneTimeActivityState: {},
    nonMemberState: {},
  }),
  getters: {
    holderState(state: any): HolderStates {
      return state.holderState
    },
    generalInsuranceState(state: any): BaseInsurance {
      return state.generalInsuranceState
    },
    insuranceTypeState(state: any): InsuranceTypes {
      return state.insuranceTypeState
    },
    getCurrentInsuranceState(state: any, getters: any): any {
      //@ts-ignore
      return state[InsuranceTypeStoreNames[getters.insuranceTypeState]]
    },
  },
  mutations: {
    SET_HOLDER_STATE(state: any, holderState: HolderStates) {
      state.holderState = holderState
    },
    SET_INSURANCE_TYPE_STATE(state: any, insuranceTypeState: InsuranceTypes) {
      state.insuranceTypeState = insuranceTypeState
    },
    SET_GENERAL_INSURANCE_STATE(state: any, generalInsuranceState: BaseInsurance) {
      state.generalInsuranceState = generalInsuranceState
    },
    SET_ONE_TIME_ACTIVITY_STATE(state: any, oneTimeActivityState: OneTimeActivity) {
      state.oneTimeActivityState = oneTimeActivityState
    },
    SET_NON_MEMBER_STATE(state: any, nonMemberState: NonMemberInsurance) {
      state.nonMemberState = nonMemberState
    },
    RESET_STATES(state: any) {
      state.holderState = HolderStates.GENERAL
      state.insuranceTypeState = InsuranceTypes.EENMALIGE_ACTIVITEIT
      state.generalInsuranceState = {}
      state.oneTimeActivityState = {}
      state.nonMemberState = {}
    },
  },
  actions: {
    setHolderState({ commit }: any, holderState: HolderStates) {
      commit('SET_HOLDER_STATE', holderState)
    },
    setInsuranceTypeState({ commit }: any, insuranceTypeState: InsuranceTypes) {
      commit('SET_INSURANCE_TYPE_STATE', insuranceTypeState)
    },
    setGeneralInsuranceState({ commit }: any, generalInsuranceState: BaseInsurance) {
      commit('SET_GENERAL_INSURANCE_STATE', generalInsuranceState)
    },
    setOneTimeActivityState({ commit }: any, oneTimeActivityState: OneTimeActivity) {
      commit('SET_ONE_TIME_ACTIVITY_STATE', oneTimeActivityState)
    },
    setNonMemberState({ commit }: any, nonMemberState: NonMemberInsurance) {
      commit('SET_NON_MEMBER_STATE', nonMemberState)
    },
    resetStates({ commit }: any) {
      commit('RESET_STATES')
    },
  },
}
