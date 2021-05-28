<template>
  <vee-form v-slot="{ values }" @submit="setHolderState()">
    <one-time-activity />
    {{ values }}
    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </vee-form>
</template>

<script lang="ts">
import OneTimeActivity from '@/components/insurances/oneTimeActivity/oneTimeActivity.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'

export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'one-time-activity': OneTimeActivity,
    'custom-button': CustomButton,
    'vee-form': Form,
  },
})
</script>
