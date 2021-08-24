<template>
  <p class="font-semibold">{{ title }}</p>
  <div :class="title === 'Aanvrager' ? 'md:ml-20 xs:ml-5 sm:ml-5' : ''">
    <p>{{ responsibleMember.firstName + ' ' + (responsibleMember.lastName ? responsibleMember.lastName : '') }}</p>
    <p>{{ responsibleMember.email }}</p>
    <phone-number :phoneNumber="responsibleMember.phoneNumber" />
    <label-output v-if="responsibleMember.membershipNumber" label="Lidnummer" :text="responsibleMember.membershipNumber" />
  </div>
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType } from 'vue'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'

export default defineComponent({
  name: 'ResponsibleMemberDetail',
  components: {
    'label-output': LabelOutput,
    'phone-number': PhoneNumber,
  },
  props: {
    responsibleMember: {
      type: Object as PropType<ResponsibleMember>,
      default: Object as PropType<ResponsibleMember>,
    },
    title: {
      type: String,
      required: false,
      default: 'Aanvrager',
    },
  },
})
</script>
