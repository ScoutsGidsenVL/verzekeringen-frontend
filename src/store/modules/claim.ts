import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import { useScrollToTop } from '@/veeValidate/helpers'
import { Claim } from '@/serializer/claims/claim'

export interface ClaimState {
  claimHolderState: string
  claimState: Claim
}

export default {
  state: (): ClaimState => ({
    claimHolderState: ClaimHolderStates.ONE,
    claimState: {},
  }),
  getters: {
    claimHolderState(state: any): ClaimHolderStates {
      return state.claimHolderState
    },
  },
  mutations: {
    SET_CLAIM_HOLDER_STATE(state: any, claimHolderState: ClaimHolderStates) {
      state.claimHolderState = claimHolderState
    },
    SET_CLAIM_STATE(state: any, claimState: Claim) {
      state.claimState = claimState
    },
    RESET_STATES(state: any) {
      state.claimHolderState = ClaimHolderStates.ONE
      state.isSubmittingState = false
    },
  },
  actions: {
    setClaimHolderState({ commit }: any, claimHolderState: ClaimHolderStates) {
      commit('SET_CLAIM_HOLDER_STATE', claimHolderState)
      const { scrollToTopOfPage } = useScrollToTop()
      scrollToTopOfPage()
    },
    setClaimState({ commit }: any, claimState: Claim) {
      commit('SET_CLAIM_STATE', claimState)
    },
    resetStates({ commit }: any) {
      commit('RESET_STATES')
    },
  },
}
