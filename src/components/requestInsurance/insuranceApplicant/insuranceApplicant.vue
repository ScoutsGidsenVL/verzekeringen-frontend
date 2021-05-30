<template>
  <label-output label="Naam" :text="user.firstName" />
  <label-output label="Lidnummer" :text="user.membershipNumber" />
  <label-output label="E-mailadres" :text="user.email" />
  <label-output label="Gsm" :text="user.phoneNumber" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { InputTypes } from '@/enums/inputTypes'
import store from '@/store/store'

export default defineComponent({
  name: 'InsuranceApplicant',
  components: {
    'label-output': LabelOutput,
  },
  setup() {
    const user = ref<any>(store.getters.user)
    return {
      InputTypes,
      user,
    }
  },
})
</script>
