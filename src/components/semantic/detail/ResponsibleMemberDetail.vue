<template>
  <p class="font-semibold">Aanvrager</p>
  <div class="px-5">
    <label-output label="Naam" :text="responsibleMember.firstName" />
    <label-output label="Lidnummer" :text="responsibleMember.membershipNumber" />
    <label-output label="E-mailadres" :text="responsibleMember.email" />
    <label-output label="Gsm" :text="responsibleMember.phoneNumber" />
  </div>
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ResponsibleMemberDetail',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    responsibleMember: {
      type: Object as PropType<ResponsibleMember>,
      default: Object as PropType<ResponsibleMember>,
    },
  },
})
</script>
