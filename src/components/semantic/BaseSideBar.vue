<template>
  <div v-if="isDisplay" class="h-full w-full fixed top-0 left-0 overflow-x-hidden z-0 bg-black bg-opacity-20" @click="hideSideBar()"></div>
  <div v-if="isDisplay" class="bg-white fixed top-0 right-0 h-full z-20 w-3/12 pt-5 px-3">
    <div class="bg-red">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { boolean } from 'yup'

export default defineComponent({
  name: 'BaseSideBar',
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: boolean,
  },
  setup(props, context) {
    const hideSideBar: () => void = () => {
      context.emit('update:isDisplay', false)
    }

    return {
      hideSideBar,
    }
  },
})
</script>
