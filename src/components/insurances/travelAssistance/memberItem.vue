<template>
  <div v-if="member" class="w-full shadow-md border-b-2 border-black bg-white p-2 h-full inline-block text-left d-flex flex-col justify-content-between">
    <div class="py-3">
      <div>
        <strong>Naam</strong>
        <p>{{ member.firstName + ' ' + member.lastName }}</p>
      </div>

      <div class="mt-3">
        <strong>Gsm</strong>
        <p>{{ member.phoneNumber !== '' ? member.phoneNumber : '/' }}</p>
      </div>

      <div v-if="member.email" class="mt-3">
        <strong>Email</strong>
        <p>{{ member.email !== '' ? member.email : '/' }}</p>
      </div>

      <div v-if="member.postCodeCity" class="mt-3">
        <strong>Adres</strong>
        <p>
          {{ member.street + ' ' + member.number + (member.letterBox ? ' Bus ' + member.letterBox : '') + ', ' + member.postCodeCity.postalCode + ' ' + member.postCodeCity.city }}
        </p>
      </div>

      <div class="mt-3">
        <strong>Geboortedatum</strong>
        <p>{{ member.birthDate }}</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Member } from '@/serializer/Member'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true,
    },
  },
})
</script>
