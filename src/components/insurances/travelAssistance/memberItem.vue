<template>
  <div v-if="member" class="w-full shadow-md border-b-2 border-black bg-white p-2 h-full inline-block text-left d-flex flex-col justify-content-between">
    <div class="py-3">
      <div class="flex justify-between">
        <div>
          <strong>{{ member.firstName + ' ' + member.lastName }}</strong>
        </div>
        <div>
          <slot name="deleteSection"></slot>
        </div>
      </div>

      <div v-if="member.email">
        <p>{{ member.email !== '' ? member.email : '/' }}</p>
      </div>

      <phone-number :phoneNumber="member.phoneNumber" />

      <div v-if="member.postCodeCity && member.street">
        <p>
          {{ member.street + ' ' + member.number + (member.letterBox ? ' Bus ' + member.letterBox : '') + ', ' + member.postCodeCity.postalCode + ' ' + member.postCodeCity.city }}
        </p>
      </div>

      <div>
        <p>{{ member.birthDate }}</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Member } from '@/serializer/Member'
import { defineComponent, PropType } from 'vue'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'

export default defineComponent({
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true,
    },
  },
  components: {
    'phone-number': PhoneNumber,
  },
})
</script>
