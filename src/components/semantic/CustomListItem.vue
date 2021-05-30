<template>
  <div class="flex justify-between py-2 border-t-2 border-black">
    <div>
      <p class="font-semibold">Datum</p>
      <p>{{ formatDate(item.startDate, item.endDate) }}</p>
    </div>
    <div>
      <p class="font-semibold">Groep</p>
      <p>{{ item.group.name }}</p>
    </div>
    <div>
      <p class="font-semibold">Type</p>
      <p>{{ item.type.description }}</p>
    </div>
    <div class="pt-3">
      <router-link :to="routeLinkBasedOnType(item.type.name) + '/' + item.id">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { routeLinkBasedOnType } from '@/helpers/routerHelper'
import { formatDate } from '@/helpers/formatHelper'
import { Insurance } from '@/serializer/Insurance'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'CustomListItem',
  props: {
    item: {
      type: Object as PropType<Insurance>,
      required: true,
    },
  },
  setup() {
    return { routeLinkBasedOnType, formatDate }
  },
})
</script>
