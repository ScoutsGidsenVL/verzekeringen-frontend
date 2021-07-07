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
  <div v-if="claimHolderState === ClaimHolderStates.FOUR">FOUR</div>
</template>

<script lang="ts">
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import RequestClaimIdentities from '@/components/requestClaim/RequestClaimIdentities.vue'
import InvolvementOtherParties from '@/components/requestClaim/InvolvementOtherParties.vue'
import AccidentDetails from '@/components/requestClaim/AccidentDetails.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HolderStateForm',
  components: {
    'involvement-other-parties': InvolvementOtherParties,
    'request-claim-identities': RequestClaimIdentities,
    'accident-details': AccidentDetails,
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
