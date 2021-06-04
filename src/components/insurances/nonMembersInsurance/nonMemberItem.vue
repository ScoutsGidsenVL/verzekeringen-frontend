<template>
  <div v-if="nonMember" class="w-96">
    <div>
      <strong>Naam</strong>
      <p>{{ nonMember.firstName + ' ' + nonMember.lastName }}</p>
    </div>

    <div class="mt-3">
      <strong>Gsm</strong>
      <p>{{ nonMember.phoneNumber }}</p>
    </div>

    <div class="mt-3">
      <strong>Adres</strong>
      <p>{{ nonMember.street + ' ' + nonMember.number + (nonMember.letterBox ? ' Bus ' + nonMember.letterBox : '') + ', ' + nonMember.postCodeCity.postalCode + ' ' + nonMember.postCodeCity.city }}</p>
    </div>

    <div class="mt-3">
      <strong>Geboortendatum</strong>
      <p>{{ nonMember.birthDate }}</p>
    </div>

    <div class="mt-3">
      <strong>Opmerking</strong>
      <p>{{ nonMember.comment }}</p>
    </div>
    <hr class="border-t-2 border-black" />
  </div>
</template>

<script lang="ts">
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    nonMember: {
      type: Object as PropType<NonMember>,
      required: true,
    },
  },
})
</script>
