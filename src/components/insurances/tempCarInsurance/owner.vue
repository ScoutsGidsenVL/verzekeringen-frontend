<template>
  <div>
    <label-output v-if="owner.companyName" label="Firma naam" :text="owner.companyName" />
    <label-output v-if="owner.firstName" label="Naam" :text="owner.firstName + ' ' + owner.lastName" />
    <label-output label="Gemeente" :text="owner.postCodeCity.postalCode + ' ' + owner.postCodeCity.city" />
    <label-output label="Gsm" :text="owner.phoneNumber" />
    <label-output label="Geboortedatum" :text="owner.birthDate" />
    <label-output label="Adres" :text="owner.street + ' ' + owner.number + (owner.letterBox ? ' Bus ' + owner.letterBox : '') + ', ' + owner.postCodeCity.postalCode + ' ' + owner.postCodeCity.city" />
  </div>
</template>

<script lang="ts">
import { Owner } from '@/serializer/Owner'
import { defineComponent, PropType } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'

export default defineComponent({
  name: 'Owner',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    owner: {
      type: Object as PropType<Owner>,
      required: true,
    },
  },
})
</script>
