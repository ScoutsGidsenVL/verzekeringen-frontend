<template>
  <div v-if="nonMember" class="w-full shadow-md border-b-2 border-black bg-white p-2 h-full inline-block text-left d-flex flex-col justify-content-between">
    <slot name="top"></slot>
    <div class="py-3">
      <div class="flex justify-between">
        <div>
          <strong>{{ nonMember.firstName + ' ' + nonMember.lastName }}</strong>
        </div>
        <div>
          <slot />
        </div>
      </div>

      <div>
        <p>
          {{ nonMember.street + ' ' + nonMember.number + (nonMember.letterBox ? ' Bus ' + nonMember.letterBox : '') + ', ' + nonMember.postCodeCity.postalCode + ' ' + nonMember.postCodeCity.city }}
        </p>
      </div>

      <div>
        <p>{{ nonMember.birthDate }}</p>
      </div>

      <div class="mt-1">
        <strong v-if="nonMember.comment">Opmerking</strong>
        <p>{{ nonMember.comment }}</p>
      </div>
    </div>
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
