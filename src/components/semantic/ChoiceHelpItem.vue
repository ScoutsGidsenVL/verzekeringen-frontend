<template>
  <div>
    <div class="max-w-xs max-w-xs border-2 border-lightGray p-3 rounded-xl">
      <div class="text-center pb-4">{{ text }}</div>
    </div>

    <div class="max-w-xs flex justify-center">
      <div class="rounded-xl bg-white p-3 border-2 border-black" style="margin-top: -2em; max-width: 15em">
        <form>
          <div class="flex">
            <div class="px-3">
              <input class="h-7 w-7 mr-2" v-model="isChecked" type="radio" :id="'yes' + id" :name="'yes' + id" :value="true" @change="emit(true)" />
              <label :for="'yes' + id"><strong>Ja</strong></label>
            </div>

            <div class="px-3">
              <input class="h-7 w-7 mr-2" v-model="isChecked" type="radio" :id="'no' + id" :name="'no' + id" :value="false" @change="emit(false)" />
              <label :for="'no' + id"><strong>Nee</strong></label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ChoiceHelpItem',
  props: {
    text: String,
    choice: [Boolean, String],
    id: String,
  },
  setup(props, context) {
    const isChecked = ref<boolean | string>('')

    const emit = (value: boolean) => {
      context.emit('update:choice', value)
    }

    watch(
      () => props.choice,
      () => {
        if (props.choice) {
          isChecked.value = props.choice
        }
      }
    )

    return {
      isChecked,
      emit,
    }
  },
})
</script>
