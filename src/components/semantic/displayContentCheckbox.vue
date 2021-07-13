<template>
  <div class="mb-3">
    <div style="max-width: 700px">
      <div>
        <p>{{ text }}</p>

        <form action="">
          <div class="flex gap-4">
            <div>
              <input :id="'YES' + text" v-model="choice" class="cursor-pointer" type="radio" :name="'YES'" :value="true" />
              <label :for="'YES' + text" class="ml-1">Ja</label>
            </div>

            <div>
              <input :id="'NO' + text" v-model="choice" class="cursor-pointer" type="radio" :name="'NO'" :value="false" />
              <label :for="'NO' + text" class="ml-1">Nee</label>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="pb-4" v-show="choice">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'DisplayContentCheckBox',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  emits: ['changeBoolean'],
  setup(props, context) {
    const choice = ref<boolean>(false)

    watch(
      () => choice.value,
      () => {
        context.emit('changeBoolean', choice.value)
      }
    )

    return {
      choice,
    }
  },
})
</script>
