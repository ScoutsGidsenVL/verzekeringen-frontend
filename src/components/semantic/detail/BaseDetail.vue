<template>
  <div>
    <div class="mt-4">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>
    <div class="mt-4">
      <p style="font-size: 30px">
        Overzicht aangevraagde verzekering
        <strong class="font-semibold">
          {{ title }}
        </strong>
      </p>
    </div>
    <slot :details="details" />
    <div v-if="details" class="mt-5 cw-auto pl-5 pt-5 pb-5 bg-lightGray">
      <h1 class="text-6xl font-extrabold">€{{ details.totalCost }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BaseDetail',
  components: {
    'navigation-arrow': NavigationArrow,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    repository: {
      type: Function as unknown as PropType<new () => BaseRepository>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const isIdUrl = !!route.params.id

    const details = ref<any>()

    if (isIdUrl) {
      RepositoryFactory.get(props.repository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          details.value = result
        })
    }

    return { details }
  },
})
</script>
