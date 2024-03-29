<template>
  <div>
    <base-side-bar
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="NonMember"
      :title="title"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <form
        id="addNewNonMember"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll overflow-x-hidden h-full"
        @submit.prevent="onSubmit"
      >
        <success-toast v-show="formSendWithSuccess" label="Persoon succesvol toegevoegd" />
        <div class="flex-col overflow-y-scroll overflow-x-hidden px-4 h-full">
          <div class="w-100">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="firstName" label="Voornaam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
          </div>

          <div class="w-100">
            <multi-select
              id="postCodeCity"
              :loading-submit="isSubmitting"
              :object="true"
              track-by="label"
              value-prop="label"
              :repository="BelgianCitySearchRepository"
              :resolve-on-load="true"
              :options="[]"
              :searchable="true"
              label="Gemeente"
              rules="required"
              placeholder="Zoek op naam/postcode"
            />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" rules="required" name="number" label="Nr" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" name="letterBox" label="Bus" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.DATE" name="birthDate" label="Geboortedatum" rules="required" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT_AREA" name="comment" label="Opmerking">
              <p v-if="isExtraInformationComment">
                Indien je niet-leden wil verzekeren die in het buitenland wonen moet je in dit tekstvak de buitenlands gemeente, postcode en land opgeven. En bij adres, het belgisch adres van de
                persoon die de verzekering aanvraagt.
              </p>
            </custom-input>
          </div>
        </div>

        <div class="py-4 sticky bottom-0 bg-white pl-4">
          <custom-button :loading-submit="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'list', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full px-4 pt-3" @submit.prevent="onSubmit">
        <div>
          <search-input
          v-if="generalInsuranceState.group"
          :start="generalInsuranceState.startDate"
          :end="generalInsuranceState.endDate"
          :group="generalInsuranceState.group.id"
          v-model:loading="loading"
          name="nonMember" 
          placeholder="Zoek op naam" 
          :repository="NonMemberRepository" 
          @fetchedOptions="fetchedOptions($event)" />
        </div>

        <!-- {{selectedNonMembers}} -->

        <div class="h-full overflow-y-scroll mt-4 pb-36">
          <hr v-if="selectedNonMembers.length > 0" class="mt-4 border-t-2 w-100 border-black" />
          <div v-for="nonMember in selectedNonMembers" :key="nonMember.id" class="w-100">
            <non-member-item :non-member="nonMember">
              <div>
                <div class="pt-3 pb-4 text-right"><custom-button type="button" :text="existingList.includes(nonMember) ? 'Toegevoegd' : 'Voeg toe'" @click="addNonMember(nonMember)" /></div>
              </div>
            </non-member-item>
          </div>
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { scrollToFirstError, useScrollToTop, useFormSendWithSuccess } from '@/veeValidate/helpers'
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { NonMemberRepository } from '@/repositories/nonMemberRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import SuccessToast from '@/components/semantic/successToast.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { NonMember } from '@/serializer/NonMember'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { BaseSideBar, sideBarState, option } from 'vue-3-component-library'

export default defineComponent({
  name: 'NonMemberSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'non-member-item': NonMemberItem,
    'search-input': SearchInput,
    'success-toast': SuccessToast,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    closeOnAdd: {
      type: Boolean,
      default: false,
      required: false,
    },
    sideBarState: {
      type: Object as PropType<sideBarState<NonMember>>,
      required: true,
      default: () => {
        'hide'
      },
    },
    isExtraInformationComment: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update:sideBarState', 'addCreatedNonMemberToList', 'updateMemberInList'],
  setup(props, context) {
    const store = useStore()
    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })
    const user = ref<ResponsibleMember>(store.getters.user)
    const { resetForm, errors, handleSubmit, validate, meta, values, isSubmitting } = useForm<NonMember>()
    // @ts-ignore
    const { formSendWithSuccess } = useFormSendWithSuccess<NonMember>(meta)
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandNonMember' : 'NieuwNonMember'))
    const selectedNonMembers = ref<NonMember[]>([])
    const loading = ref<boolean>(false)
    const { formDiv, scrollToTop } = useScrollToTop()
    const { sideBarState } = toRefs(props)

    const options = ref<option[]>([
      { text: 'Nieuw', value: 'Nieuw' },
      { text: 'Uit eerdere aanvragen', value: 'Bestaand' },
    ])

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewNonMember'))
      handleSubmit(async (values: NonMember) => {
        if (props.sideBarState.state === 'new' || props.sideBarState.state === 'edit') {
          console.log('VALUES:', values)
          const nonMember = ref<NonMember>({
            id: values.id,
            inuitsId: values.inuitsId,
            lastName: values.lastName,
            firstName: values.firstName,
            phoneNumber: values.phoneNumber ? values.phoneNumber : '/',
            birthDate: values.birthDate ? values.birthDate : undefined,
            street: values.street,
            number: values.number,
            letterBox: values.letterBox,
            comment: values.comment,
            postCodeCity: values.postCodeCity,
            group: generalInsuranceState.value.group.id,
          })
          if (props.sideBarState.state === 'edit') {
            await editNonMember(nonMember.value)
          } else {
            await postNonMember(nonMember.value)
          }
        }

        // selectedNonMembers.value = []
      })()
    }

    const addNonMember = (nonMember: NonMember) => {
      if (!props.existingList.includes(nonMember)) {
        context.emit('addCreatedNonMemberToList', nonMember)
      }
      if (props.closeOnAdd) {
        closeSideBar()
      }
    }

    const editNonMember = async (data: NonMember) => {
      formSendWithSuccess.value = false
      console.log('data to edit: ', data)
      if (data.inuitsId) {
        await RepositoryFactory.get(NonMemberRepository)
          .update(data.inuitsId, data)
          .then((completed: NonMember) => {
            completed.inuitsId = data.inuitsId
            context.emit('updateMemberInList', completed)
            closeSideBar()
          })
      }
    }

    const postNonMember = async (data: NonMember) => {
      formSendWithSuccess.value = false
      await RepositoryFactory.get(NonMemberRepository)
        .create(data)
        .then((completed: NonMember) => {
          completed.inuitsId = completed.id
          context.emit('addCreatedNonMemberToList', completed)
          formSendWithSuccess.value = true
          scrollToTop()
          resetForm()
          if (props.closeOnAdd) {
            closeSideBar()
          }
        })
    }

    const fetchedOptions = (options: any) => {
      selectedNonMembers.value = []
      options.forEach((nonMember: any) => {
        selectedNonMembers.value.push(nonMember.value)
      })
      loading.value = false
    }

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const changeSideBar = (options: 'NieuwNonMember' | 'BestaandNonMember') => {
      if (options === 'NieuwNonMember') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandNonMember') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    watch(sideBarState, (value: sideBarState<NonMember>) => {
      if (value.state === 'edit') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: value.entity.id,
            inuitsId: value.entity.inuitsId,
            lastName: value.entity.lastName,
            firstName: value.entity.firstName,
            phoneNumber: value.entity.phoneNumber,
            birthDate: value.entity.birthDate,
            street: value.entity.street,
            number: value.entity.number,
            letterBox: value.entity.letterBox,
            comment: value.entity.comment,
            postCodeCity: value.entity.postCodeCity,
          },
        })
      }

      if (value.state === 'new') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: '',
            inuitsId: '',
            lastName: '',
            firstName: '',
            phoneNumber: '',
            birthDate: '',
            street: '',
            number: '',
            letterBox: '',
            comment: '',
            postCodeCity: {},
          },
          errors: {},
        })
      }
    })

    return {
      BelgianCitySearchRepository,
      generalInsuranceState,
      NonMemberRepository,
      formSendWithSuccess,
      selectedNonMembers,
      fetchedOptions,
      editNonMember,
      changeSideBar,
      addNonMember,
      closeSideBar,
      isSubmitting,
      InputTypes,
      selected,
      onSubmit,
      loading,
      formDiv,
      options,
      errors,
      values,
      user,
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
