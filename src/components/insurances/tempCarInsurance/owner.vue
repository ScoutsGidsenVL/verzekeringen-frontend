<template>
  <div>
    <p  class="mb-0" v-if="owner.companyName"><strong>Firmanaam:</strong> {{owner.companyName}}</p>
    <p v-if="owner.firstName">{{ owner.firstName + ' ' + owner.lastName }}</p>
    <div>
      <p>{{ owner.street + ' ' + owner.number + (owner.letterBox ? ' Bus ' + owner.letterBox : '') + ', ' + owner.postCodeCity.postalCode + ' ' + owner.postCodeCity.city }}</p>
    </div>
    <phone-number :phoneNumber="owner.phoneNumber" />

    <div>
      <p v-if="!owner.companyName">{{ owner.birthDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Owner } from '@/serializer/Owner'
import { defineComponent, PropType } from 'vue'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'

export default defineComponent({
  name: 'Owner',
  components: {
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
