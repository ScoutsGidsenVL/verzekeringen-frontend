<template>
  <div v-if="item" class="md:grid-cols-claims grid py-2 border-t-2 border-black">
    <div>
      <p>{{ item.dateOfAccident ? formatSingleDate(item.dateOfAccident) : '' }}</p>
    </div>

    <div>
      <p>{{ item.group && item.group.name ? item.group.name : '' }} {{ item.group && item.group.id ? item.group.id : '' }}</p>
    </div>

    <div>
      <p>{{ item.victim.firstName + ' ' + item.victim.lastName }}</p>
    </div>
    <div>DETAIL</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { formatSingleDate } from '@/helpers/formatHelper'

export default defineComponent({
  name: 'CustomListItem',
  components: {},
  props: {
    item: {
      type: Object as PropType<Claim>,
      required: true,
    },
  },
  setup() {
    return {
      formatSingleDate,
    }
  },
})
</script>

<style lang="scss" scoped>
.date-under {
  display: none !important;
}

.date-normal {
  display: block !important;
}
@media (min-width: 768px) and (max-width: 1200px) {
  .date-under {
    display: block !important;
  }

  .date-normal {
    display: none !important;
  }
}
</style>
