<template>
  <div v-if="isDisplay" class="h-full w-full fixed top-0 left-0 overflow-x-hidden z-0 bg-black bg-opacity-20" @click="hideSideBar()"></div>
  <div v-if="isDisplay" :class="'bg-white fixed top-0 right-0 h-full z-20 pt-5 px-4' + ' ' + width">
    <header-2 :text="title" />
    <form v-if="options" action="">
      <div class="flex gap-7">
        <div>
          <input :id="1" v-model="selected" class="cursor-pointer" type="radio" :name="1" value="option-1" @change="emitOption()" />
          <label :for="index" class="ml-2">{{ options[0] }}</label>
        </div>

        <div>
          <input :id="2" v-model="selected" class="cursor-pointer" type="radio" :name="2" value="option-2" @change="emitOption()" />
          <label :for="index" class="ml-2">{{ options[1] }}</label>
        </div>
      </div>
    </form>

    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import header2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'BaseSideBar',
  components: {
    'header-2': header2,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: Boolean,
    selection: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Array<String>>,
      required: false,
    },
    width: {
      type: String,
      default: 'w-3/12',
      required: false,
    },
  },
  setup(props, context) {
    const selected = ref<string>(props.selection)

    const hideSideBar: () => void = () => {
      context.emit('update:isDisplay', false)
    }

    const emitOption = () => {
      context.emit('update:selection', selected.value)
    }

    return {
      hideSideBar,
      emitOption,
      selected,
    }
  },
})
</script>
