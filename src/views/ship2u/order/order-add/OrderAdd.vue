<template>
  <section>

    <b-row>

      <!-- Col: Left (Parcel Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <form-wizard-icon />
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="parcel-actions"
      >

        <!-- Action Buttons -->
        <b-card>

          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
            @click="Back"
          >
            {{ $t('Cancel') }}
          </b-button>

          <b-button
            v-b-toggle.sidebar-parcel-add-payment
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            type="reset"
            block
            @click="$router.go()"
          >
            {{ $t('Reset') }}
          </b-button>

        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import {
  BRow, BCol, BCard, BButton, VBToggle,
} from 'bootstrap-vue'
import FormWizardIcon from './OrderWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    FormWizardIcon,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],

  // Reset Tr Height if data changes
  watch: {
  },
  mounted() {
  },
  created() {
  },
  destroyed() {
  },
  methods: {
  },
  setup() {
    const boo = ref(false)
    const newAddress = ref({
      title: '',
      firstname: '',
      lastname: '',
      tel: '',
      address: '',
      suburb: '',
      city: 'Auckland',
      country: 'New Zealand',
      postcode: '',
      custom_code: '',
      business_name: '',
    })

    function changeSwitch(e) {
      boo.value = e
      console.log(e)
    }
    function Back() {
      this.$router.go(-1)
    }

    function onPost() {
      store.dispatch('ship2u/addAddress', { obj: newAddress.value, isSender: false })
        .then(r => {
          console.log(r)
          if (r.code === 0) {
            this.$bvModal.msgBoxOk('Data was submitted successfully', {
              title: 'Confirmation',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
            })
              .then(() => {
                this.$router.go(-1)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$bvModal.msgBoxOk(r.msg, {
              title: 'Confirmation',
              okVariant: 'alert',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
            })
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            newAddress.value = undefined
          }
        })
      // editParcel(formData.value)
    }

    return {
      boo,
      newAddress,
      onPost,
      changeSwitch,
      Back,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
