<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title" :options="['Nieuw', 'Bestaand']">
      <div v-if="selected === 'option-1'" class="mt-4">
        <form @submit="onSubmit">
          <div class="custom-container mt-4">NIEUW</div>

          <div class="mt-5">
            <custom-button text="Voeg toe" />
          </div>
        </form>
      </div>

      <div v-if="selected === 'option-2'">
        <form @submit="onSubmit">
          <div>
            <search-input name="equipment" placeholder="Zoek op naam" v-model:loading="loading" :repository="NonMemberRepository" @fetchedOptions="fetchedOptions($event)" />
          </div>

          <div class="custom-container mt-4">
            <hr v-if="searchedEquipmentList.length > 0" class="mt-4 border-t-2 w-96 border-black" />
            <div class="w-96" v-for="equipment in searchedEquipmentList" :key="equipment.id">
              <equipment-item :equipment="equipment">
                <div>
                  <div class="pt-3 pb-4 text-right">
                    <custom-button @click="addEquipment(equipment)" type="button" text="Voeg toe" />
                  </div>
                </div>
              </equipment-item>
            </div>
          </div>
          <div v-if="selected.value === 'option-1'" class="mt-5"><custom-button text="Voeg toe" /></div>
        </form>
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import EquipmentItem from '@/components/insurances/materialInsurance/equipmentItem.vue'
import { NonMemberRepository } from '@/repositories/nonMemberRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import SearchInput from '@/components/inputs/SearchInput.vue'
import { Equipment } from '@/serializer/Equipment'

export default defineComponent({
  name: 'NonMemberSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'equipment-item': EquipmentItem,
    'search-input': SearchInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: {
      type: Boolean,
      required: true,
    },
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(props, context) {
    const store = useStore()
    const display = ref<boolean>(props.isDisplay)
    const { handleSubmit } = useForm<Equipment>()
    const selected = ref<string>('option-1')
    const loading = ref<boolean>(false)
    const searchedEquipmentList = ref<Array<Equipment>>([])

    const onSubmit = handleSubmit(async (values: Equipment) => {
      if (selected.value === 'option-1') {
        const generalInsuranceState = ref<any>(store.getters.generalInsuranceState)

        const equipment = ref<Equipment>({
          nature: values.nature ? values.nature : undefined,
          description: values.description ? values.description : undefined,
          totalValue: values.totalValue ? values.totalValue : undefined,
          ownerMember: values.ownerMember ? values.ownerMember : undefined,
          ownerNonMember: values.ownerNonMember ? values.ownerNonMember : undefined,
          group: generalInsuranceState.value.group.name,
        })
        postEquipment(equipment.value)
      }
    })

    const addEquipment = (equipment: Equipment) => {
      if (!props.existingList.includes(equipment)) {
        context.emit('addEquipmentToList', equipment)
      }
    }

    const postEquipment = (data: Equipment) => {
      RepositoryFactory.get(NonMemberRepository)
        .create(data)
        .then((completed: Equipment) => {
          context.emit('addEquipmentToList', completed)
        })
    }

    const fetchedOptions = (options: any) => {
      searchedEquipmentList.value = options
      loading.value = false
    }

    watch(
      () => props.isDisplay,
      () => {
        display.value = props.isDisplay
      }
    )

    watch(
      () => display.value,
      () => {
        context.emit('update:isDisplay', display.value)
      }
    )

    return {
      NonMemberRepository,
      searchedEquipmentList,
      addEquipment,
      InputTypes,
      selected,
      display,
      onSubmit,
      fetchedOptions,
      loading,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-container {
  max-height: 550px;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
}
</style>
