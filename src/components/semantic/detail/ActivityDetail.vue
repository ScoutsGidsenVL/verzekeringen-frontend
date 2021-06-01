<template>
  <p class="font-semibold">Activiteit</p>
  <div class="px-5">
    <div class="mt-3">
      <custom-input :value="nature" :type="InputTypes.TEXT_AREA" name="nature" label="Aard van activiteit" :disabled="true" />
    </div>
    <label-output label="Locatie" :text="location.postalCode + ' ' + location.city" />
    <label-output label="Aantal personen" :text="groupAmount" />
  </div>
</template>

<script lang="ts">
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { defineComponent, PropType } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Location } from '@/serializer/Location'

export default defineComponent({
  name: 'ActivityDetail',
  components: {
    'label-output': LabelOutput,
    'custom-input': CustomInput,
  },
  props: {
    nature: {
      type: String,
      default: '',
    },
    groupAmount: {
      type: [String, Number],
      default: 0,
    },
    location: {
      type: Object as PropType<Location>,
      default: Object as PropType<Location>,
    },
  },
  setup() {
    return {
      InputTypes,
    }
  },
})
</script>
