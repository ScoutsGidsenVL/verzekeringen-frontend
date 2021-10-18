<template>
  <div class="flex py-3 xs:flex-col">
    <bread-crumb-item
      :is-change-state-possible="claimHolderState === ClaimHolderStates.TWO || claimHolderState === ClaimHolderStates.THREE || claimHolderState === ClaimHolderStates.FOUR"
      :visible-on-state="ClaimHolderStates.ONE"
      :index="'1'"
      :text="'Slachtoffer'"
    />
    <bread-crumb-item
      :is-change-state-possible="claimHolderState === ClaimHolderStates.THREE || claimHolderState === ClaimHolderStates.FOUR"
      :visible-on-state="ClaimHolderStates.TWO"
      :index="'2'"
      :text="'Ongeval'"
    />
    <bread-crumb-item :is-change-state-possible="claimHolderState === ClaimHolderStates.FOUR" :visible-on-state="ClaimHolderStates.THREE" :index="'3'" :text="'Betrokkenen'" />
    <bread-crumb-item :is-change-state-possible="false" :visible-on-state="ClaimHolderStates.FOUR" :index="'4'" :text="'Overzicht'" />
    <bread-crumb-item :is-change-state-possible="false" :visible-on-state="ClaimHolderStates.FIVE" :index="'5'" :text="'Verzonden'" />
  </div>
</template>

<script lang="ts">
import BreadCrumbItemClaim from '@/components/requestClaim/requestBreadCrumb/BreadCrumbItemClaim.vue'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestBreadCrumb',
  components: {
    'bread-crumb-item': BreadCrumbItemClaim,
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
