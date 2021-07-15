<template>
  <div v-show="claimHolderState === ClaimHolderStates.ONE">
    <request-claim-identities />
  </div>

  <div v-show="claimHolderState === ClaimHolderStates.TWO">
    <accident-details />
  </div>

  <div v-show="claimHolderState === ClaimHolderStates.THREE">
    <involvement-other-parties />
  </div>
  <div v-if="claimHolderState === ClaimHolderStates.FOUR">
    <claim-detail />
  </div>

  <div v-if="claimHolderState === ClaimHolderStates.FIVE">
    SUCCES
    <div class="mt-4 container inline-block">
      <navigation-arrow to="/home/schade-aangiftes" text="Terug naar overzicht" />
    </div>
  </div>
</template>

<script lang="ts">
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import RequestClaimIdentities from '@/components/requestClaim/RequestClaimIdentities.vue'
import InvolvementOtherParties from '@/components/requestClaim/InvolvementOtherParties.vue'
import AccidentDetails from '@/components/requestClaim/AccidentDetails.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import ClaimDetail from '@/components/requestClaim/detail/claimDetail.vue'
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'

export default defineComponent({
  name: 'HolderStateForm',
  components: {
    'involvement-other-parties': InvolvementOtherParties,
    'request-claim-identities': RequestClaimIdentities,
    'accident-details': AccidentDetails,
    'claim-detail': ClaimDetail,
    'navigation-arrow': NavigationArrow,
  },
  setup() {
    const store = useStore()
    const claimHolderState = computed((): ClaimHolderStates => {
      return store.state.claim.claimHolderState
    })

    return {
      ClaimHolderStates,
      claimHolderState,
    }
  },
})
</script>
