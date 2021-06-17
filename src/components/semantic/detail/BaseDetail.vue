<template>
  <div>
    <div v-if="isDetail" class="mt-4">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>
    <div class="mt-3">
      <div v-html="titelText"></div>
    </div>
    <slot :details="details" :isDetail="isDetail" />

    <div v-if="details" class="mt-5 cw-auto pl-5 pt-5 pb-5 bg-lightGray">
      <h1 class="text-2xl font-extrabold">€{{ details.totalCost }}</h1>
    </div>
  </div>

  <div v-if="holderState === HolderStates.COMPLETED" class="mt-4 inline-block">
    <navigation-arrow to="/home" text="Terug naar overzicht" />
  </div>
</template>

<script lang="ts">
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { HolderStates } from '@/enums/holderStates'

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
    data: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const isDetail = !!route.meta.detail
    const titelText = ref<string>('<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong> verzekering</p>')
    const details = ref<any>(isDetail ? null : props.data)

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    watch(
      () => holderState.value,
      () => {
        if (holderState.value === HolderStates.COMPLETED) {
          titelText.value = '<p style="font-size: 30px">Uw <strong class="font-semibold">' + props.title + '</strong> verzekering is aangevraagd </p>'
        }
      }
    )

    if (isDetail) {
      RepositoryFactory.get(props.repository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          details.value = result
        })
      titelText.value = '<p style="font-size: 30px">Overzicht aangevraagde verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
    }

    if (holderState.value === HolderStates.COMPLETED) {
      titelText.value = '<p style="font-size: 30px">Je <strong class="font-semibold">' + props.title + '</strong> verzekering is aangevraagd </p>'
      if (props.title === 'Evenementen verzekering') {
        titelText.value = '<p style="font-size: 30px">Je <strong class="font-semibold">' + props.title + '</strong> is aangevraagd</p>'
      }
    }

    if (holderState.value === HolderStates.DETAIL) {
      if (props.title === 'Niet leden') {
        titelText.value = '<p style="font-size: 30px">Overzicht tijdelijke verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
      }
      if (props.title === 'Reisbijstand') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong> verzekering</p>'
      }
      if (props.title === 'Tijdelijke') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + 'tijdelijke autoverzekering' + '</strong></p>'
      }
      if (props.title === 'Materiaal') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + 'materiaal verzekering' + '</strong></p>'
      }
    }

    return {
      HolderStates,
      holderState,
      titelText,
      isDetail,
      details,
    }
  },
})
</script>
