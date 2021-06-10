import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import { InsuranceTypes, InsuranceTypeStoreNames } from '@/enums/insuranceTypes'
import { HolderStates } from '@/enums/holderStates'
import { NonMemberInsurance } from '@/serializer/insurances/NonMemberInsurance'
import { TravelAssistanceInsurance } from '@/serializer/insurances/TravelAssistanceInsurance'
import { TemporaryVehicleInsurance } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { EventInsurance } from '@/serializer/insurances/EventInsurance'

export interface InsuranceState {
  holderState: string
  insuranceTypeState: string
  generalInsuranceState: BaseInsurance
  oneTimeActivityState: OneTimeActivity
  nonMemberState: NonMemberInsurance
  travelAssistanceState: TravelAssistanceInsurance
  temporaryVehicleState: TemporaryVehicleInsurance
  eventState: EventInsurance
}

export default {
  state: (): InsuranceState => ({
    holderState: HolderStates.GENERAL,
    insuranceTypeState: InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN,
    generalInsuranceState: {},
    oneTimeActivityState: {},
    nonMemberState: {},
    travelAssistanceState: {},
    temporaryVehicleState: {},
    eventState: {},
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
    SET_TRAVEL_ASSISTANCE_STATE(state: any, travelAssistanceState: TravelAssistanceInsurance) {
      state.travelAssistanceState = travelAssistanceState
    },
    SET_TEMPORARY_VEHICLE_STATE(state: any, temporaryVehicleInsurance: TemporaryVehicleInsurance) {
      state.temporaryVehicleState = temporaryVehicleInsurance
    },
    SET_EVENT_STATE(state: any, eventInsurance: EventInsurance) {
      state.eventState = eventInsurance
    },
    RESET_STATES(state: any) {
      state.holderState = HolderStates.GENERAL
      state.insuranceTypeState = InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN
      state.generalInsuranceState = {}
      state.oneTimeActivityState = {}
      state.nonMemberState = {}
      state.travelAssistanceState = {}
      state.temporaryVehicleState = {}
      state.eventState = {}
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
    setTravelAssistanceState({ commit }: any, travelAssistanceState: TravelAssistanceInsurance) {
      commit('SET_TRAVEL_ASSISTANCE_STATE', travelAssistanceState)
    },
    setTemporaryVehicleState({ commit }: any, temporaryVehicleInsurance: TemporaryVehicleInsurance) {
      commit('SET_TEMPORARY_VEHICLE_STATE', temporaryVehicleInsurance)
    },
    setEventState({ commit }: any, eventInsurance: EventInsurance) {
      commit('SET_EVENT_STATE', eventInsurance)
    },
    resetStates({ commit }: any) {
      commit('RESET_STATES')
    },
  },
}
