<template>
  <p class="font-semibold">Activiteit</p>
  <div class="px-5">
    <label-output label="Aard van activiteit" :text="nature" />
    <label-output label="Locatie" :text="location.postalCode + ' ' + location.city" />
    <label-output v-if="size" label="Aantal extra te verzekeren personen" :text="size.label" />
  </div>
</template>

<script lang="ts">
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType, ref } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Location } from '@/serializer/Location'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { InsuranceGroupSizesRepository } from '@/repositories/insuranceGroupSizes'
import { InsuranceGroupSize } from '@/serializer/InsuranceGroupSizes'

export default defineComponent({
  name: 'ActivityDetail',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    nature: {
      type: String,
      default: '',
    },
    groupSize: {
      type: Number,
      default: 0,
    },
    location: {
      type: Object as PropType<Location>,
      default: Object as PropType<Location>,
    },
  },
  setup(props) {
    const size = ref<InsuranceGroupSize>()

    const fetchGroupSizes = () => {
      RepositoryFactory.get(InsuranceGroupSizesRepository)
        .getArray()
        .then((result: InsuranceGroupSize[]) => {
          getGroupSize(props.groupSize, result)
        })
    }

    const getGroupSize = (groupSize: number, groupSizes: InsuranceGroupSize[]) => {
      size.value = groupSizes.find((x: InsuranceGroupSize) => x.value === groupSize)
    }

    fetchGroupSizes()

    return {
      InputTypes,
      size,
    }
  },
})
</script>
