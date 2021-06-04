<template>
  <h2 class="py-5 text-2xl">{{ title }}</h2>
  <div class="grid grid-cols-4 py-2 border-t-2 border-black">
    <div>
      <p class="font-semibold">Datum</p>
    </div>
    <div>
      <p class="font-semibold">Groep</p>
    </div>
    <div>
      <p class="font-semibold">Type</p>
    </div>
  </div>
  <custom-list-item v-for="item in items" :key="item.id" :item="item" />
  <hr class="border-t-2 border-black" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    items: {
      type: Array,
      required: true,
    },
  },
})
</script>
