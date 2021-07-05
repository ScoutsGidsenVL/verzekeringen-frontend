<template>
  <div :class="{ container: singlePage }">
    <div v-if="isDetail" class="mt-4">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>

    <div class="mt-3">
      <div v-html="titelText"></div>
    </div>

    <custom-headline-sticker v-if="details" :text="'Totaalprijs: ' + '&euro; ' + details.totalCost" />

    <important-message style="width: 484px" v-if="details.vvksComment" :message="details.vvksComment" />

    <slot :details="details" :isDetail="isDetail" />
  </div>

  <div v-if="holderState === HolderStates.COMPLETED">
    <call-to-action v-if="details" class="mt-4" :text="'&euro; ' + details.totalCost" />
    <div class="mt-4 container inline-block">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>
  </div>
</template>

<script lang="ts">
import CustomHeadlineSticker from '@/components/customHeadlines/CustomHeadlineSticker.vue'
import ImportantMessage from '@/components/semantic/ImportantMessage.vue'
import CallToAction from '@/components/customHeadlines/CallToAction.vue'
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { HolderStates } from '@/enums/holderStates'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BaseDetail',
  components: {
    'custom-headline-sticker': CustomHeadlineSticker,
    'important-message': ImportantMessage,
    'navigation-arrow': NavigationArrow,
    'call-to-action': CallToAction,
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
    singlePage: {
      type: Boolean,
      required: false,
      default: false,
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
      if (props.title === 'Materiaal') {
        titelText.value = '<p style="font-size: 30px">Je <strong class="font-semibold">' + 'Materiaal verzekering' + '</strong> is aangevraagd</p>'
      }
      if (props.title === 'Tijdelijke') {
        titelText.value = '<p style="font-size: 30px">Je <strong class="font-semibold">' + 'Tijdelijke autoverzekering' + '</strong> is aangevraagd</p>'
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
