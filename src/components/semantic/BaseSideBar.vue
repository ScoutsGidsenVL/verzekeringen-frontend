<template>
  <div v-if="isDisplay" class="h-full w-full fixed top-0 left-0 overflow-x-hidden z-0 bg-black bg-opacity-20" @click="hideSideBar()"></div>
  <div :class="{ 'd-flex': isDisplay, 'd-none': !isDisplay }" class="bg-white x fixed flex-col top-0 right-0 h-full z-20 pt-5 px-4 'w-2/5">
    <div class="mb-3 cursor-pointer" @click="hideSideBar()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path
          d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
        />
      </svg>
    </div>
    <header-2 :text="title" />
    <form v-if="options && !isEdit" action="">
      <div class="flex gap-7">
        <div>
          <input :id="options[0] + name" v-model="selected" class="cursor-pointer" type="radio" :name="options[0] + name" :value="options[0] + name" @change="emitOption()" />
          <label :for="options[0] + name" class="ml-2">{{ options[0] }}</label>
        </div>

        <div>
          <input :id="options[1] + name" v-model="selected" class="cursor-pointer" type="radio" :name="options[1] + name" :value="options[1] + name" @change="emitOption()" />
          <label :for="options[1] + name" class="ml-2">{{ options[1] }}</label>
        </div>
      </div>
    </form>

    <slot />
  </div>
</template>

<script lang="ts">
import header2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { defineComponent, PropType, ref, toRefs, watch } from 'vue'

export type sideBarState<T> =
  | {
      state: 'edit'
      entity: T
    }
  | { state: 'list' }
  | { state: 'new' }
  | { state: 'hide' }

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
      required: false,
      default: '',
    },
    options: {
      type: Array as PropType<Array<String>>,
      required: false,
    },
    width: {
      type: String,
      default: 'w-2/5',
      required: false,
    },
    isEdit: Boolean,
    name: String,
  },
  setup(props, context) {
    const selected = ref<string>(props.selection)

    const { isDisplay, selection } = toRefs(props)

    watch(selection, (value: string) => {
      selected.value = value
    })

    watch(isDisplay, (value: boolean) => {
      if (value == true) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    })

    const hideSideBar: () => void = () => {
      context.emit('update:isDisplay', false)
      context.emit('hideSidebar')
    }

    const emitOption = () => {
      context.emit('options', selected.value)
    }

    return {
      hideSideBar,
      emitOption,
      selected,
    }
  },
})
</script>
