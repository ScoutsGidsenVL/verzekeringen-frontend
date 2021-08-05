<template>
  <div>
    <label-output :bold="true" v-if="owner.companyName" label="Firma naam" :text="owner.companyName" />
    <strong v-if="owner.firstName">{{ owner.firstName + ' ' + owner.lastName }}</strong>
    <p>{{ owner.street + ' ' + owner.number + (owner.letterBox ? ' Bus ' + owner.letterBox : '') + ', ' + owner.postCodeCity.postalCode + ' ' + owner.postCodeCity.city }}</p>
    <phone-number :phoneNumber="owner.phoneNumber" />

    <label-output v-if="!owner.companyName" :text="owner.birthDate" />
  </div>
</template>

<script lang="ts">
import { Owner } from '@/serializer/Owner'
import { defineComponent, PropType } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'

export default defineComponent({
  name: 'Owner',
  components: {
    'label-output': LabelOutput,
    'phone-number': PhoneNumber,
  },
  props: {
    owner: {
      type: Object as PropType<Owner>,
      required: true,
    },
  },
})
</script>
