<template>
  <h2 class="py-5 text-2xl">{{ title }}</h2>
  <custom-list-item v-for="fakeItem in fakeItems" :key="fakeItem.id" :item="fakeItem" />
  <hr class="border-t-2 border-black" />
  <p class="text-lightGreen cursor-pointer mt-5">bekijk alle</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { insurance } from '../../serializer/insurance'
import CustomListItem from '../semantic/CustomListItem.vue'

export default defineComponent({
  name: 'CustomList',
  components: {
    'custom-list-item': CustomListItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const fakeItems = ref<insurance[]>([
      {
        id: 1,
        date: '01 mei - 05 mei 2021',
        group: '23ste don bosco',
        type: 'Reisbijstand',
      },
      {
        id: 2,
        date: '01 mei - 05 mei 2021',
        group: '23ste don bosco',
        type: 'Reisbijstand',
      },
      {
        id: 3,
        date: '01 mei - 05 mei 2021',
        group: '23ste don bosco',
        type: 'Reisbijstand',
      },
    ])
    return {
      fakeItems,
    }
  },
})
</script>
