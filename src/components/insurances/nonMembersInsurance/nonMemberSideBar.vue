<template>
  <div>
    <base-side-bar
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="NonMember"
      :title="title"
      :options="['Nieuw', 'Bestaand']"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <form
        id="addNewNonMember"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full"
        @submit.prevent="onSubmit"
      >
        <success-toast v-model:showOrHide="formSendWithSuccess" label="Niet lid succesvol toegevoegd" />
        <div class="mt-4">
          <div class="w-96">
            <custom-input :type="InputTypes.TEXT" rules="required" name="firstName" label="Voornaam" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
          </div>

          <div class="w-96">
            <multi-select
              id="postCodeCity"
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

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="number" label="Nr" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" name="letterBox" label="Bus" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.DATE" rules="required" name="birthDate" label="Geboortedatum" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="Opmerking">
              <p v-if="isExtraInformationComment">
                Indien je niet-leden wil verzekeren die in het buitenland wonen moet je in dit tekstvak de buitenlands gemeente, postcode en land opgeven. En bij adres, het belgisch adres van de
                persoon die de verzekering aanvraagt.
              </p>
            </custom-input>
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white">
          <custom-button :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'list', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full" @submit.prevent="onSubmit">
        <div>
          <search-input v-model:loading="loading" name="nonMember" placeholder="Zoek op naam" :repository="NonMemberRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="h-full overflow-y-scroll mt-4 pb-36">
          <hr v-if="selectedNonMembers.length > 0" class="mt-4 border-t-2 w-96 border-black" />
          <div v-for="nonMember in selectedNonMembers" :key="nonMember.id" class="w-96">
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
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberRepository } from '@/repositories/nonMemberRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { NonMember } from '@/serializer/NonMember'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import SearchInput from '@/components/inputs/SearchInput.vue'
import { scrollToFirstError, useScrollToTop, useFormSendWithSuccess } from '@/veeValidate/helpers'
import SuccessToast from '@/components/semantic/successToast.vue'

export type sideBarState<T> =
  | {
      state: 'edit'
      entity: T
    }
  | { state: 'list' }
  | { state: 'new' }
  | { state: 'hide' }

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
  },
  emits: ['update:sideBarState', 'addCreatedNonMemberToList', 'updateMemberInList'],
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const { resetForm, errors, handleSubmit, validate, meta, values } = useForm<NonMember>()
    const { formSendWithSuccess } = useFormSendWithSuccess<NonMember>(meta)
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandNonMember' : 'NieuwNonMember'))
    const selectedNonMembers = ref<NonMember[]>([])
    const loading = ref<boolean>(false)
    const { formDiv, scrollToTop } = useScrollToTop()

    const { sideBarState } = toRefs(props)

    watch(sideBarState, (value: sideBarState<NonMember>) => {
      if (value.state === 'edit') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: value.entity.id,
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

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewNonMember'))
      handleSubmit(async (values: NonMember) => {
        if (props.sideBarState.state === 'new' || props.sideBarState.state === 'edit') {
          const generalInsuranceState = ref<any>(store.getters.generalInsuranceState)

          const nonMember = ref<NonMember>({
            id: values.id,
            lastName: values.lastName,
            firstName: values.firstName,
            phoneNumber: values.phoneNumber ? values.phoneNumber : '/',
            birthDate: values.birthDate,
            street: values.street,
            number: values.number,
            letterBox: values.letterBox,
            comment: values.comment,
            postCodeCity: values.postCodeCity,
            group: generalInsuranceState.value.group.name,
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

    const editNonMember = (data: NonMember) => {
      formSendWithSuccess.value = false
      if (data.id) {
        RepositoryFactory.get(NonMemberRepository)
          .update(data.id, data)
          .then((completed: NonMember) => {
            context.emit('updateMemberInList', completed)
            closeSideBar()
          })
      }
    }

    const postNonMember = (data: NonMember) => {
      formSendWithSuccess.value = false
      RepositoryFactory.get(NonMemberRepository)
        .create(data)
        .then((completed: NonMember) => {
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
      console.log(options)
      if (options === 'NieuwNonMember') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandNonMember') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    return {
      BelgianCitySearchRepository,
      NonMemberRepository,
      selectedNonMembers,
      addNonMember,
      InputTypes,
      selected,
      onSubmit,
      user,
      fetchedOptions,
      loading,
      formSendWithSuccess,
      formDiv,
      errors,
      editNonMember,
      closeSideBar,
      changeSideBar,
      values,
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
