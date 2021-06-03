<template>
  <div v-if="nonMember" class="w-96">
    <!-- <hr class="border-t-2 border-black" /> -->
    <label-output label="Naam" :text="nonMember.firstName + ' ' + nonMember.lastName" />
    <label-output
      label="Adres"
      :text="nonMember.street + ' ' + nonMember.number + (nonMember.letterBox ? nonMember.letterBox : '') + ', ' + nonMember.postCodeCity.postalCode + ' ' + nonMember.postCodeCity.city"
    />
    <label-output label="Geboortedatum" :text="nonMember.birthDate" />
    <hr class="border-t-2 border-black" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'

export default defineComponent({
  name: 'NonMemberItem',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    nonMember: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup() {},
})
</script>
