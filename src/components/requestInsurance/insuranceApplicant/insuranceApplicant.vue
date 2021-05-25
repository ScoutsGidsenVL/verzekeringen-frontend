<template>
  <label-output label="Naam" text="Ricardo" />
  <label-output label="Lidnummer" text="68488752402489" />
  <label-output label="E-mailadres" text="ricardo@inuits.eu" />
  <custom-input :type="InputTypes.TEXT" name="gsm" label="Gsm" class="mt-3" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { InputTypes } from '@/enums/inputTypes'

export default defineComponent({
  name: 'InsuranceApplicant',
  components: {
    'label-output': LabelOutput,
    'custom-input': CustomInput,
  },
  setup() {
    return {
      InputTypes,
    }
  },
})
</script>
