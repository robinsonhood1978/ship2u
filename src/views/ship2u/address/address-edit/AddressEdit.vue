<template>
  <section class="parcel-add-wrapper">

    <b-row
      class="parcel-add"
    >

      <!-- Col: Left (Parcel Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-form @submit.prevent>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Address Description"
                label-for="des"
              >
                <b-form-input
                  id="des"
                  v-model="newAddress.title"
                  placeholder="Address Description"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="First Name"
                label-for="mc-first-name"
              >
                <b-form-input
                  id="mc-first-name"
                  v-model="newAddress.firstname"
                  placeholder="First Name"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Last Name"
                label-for="mc-last-name"
              >
                <b-form-input
                  id="mc-last-name"
                  v-model="newAddress.lastname"
                  placeholder="Last Name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Contact Number"
                label-for="contactNo"
              >
                <b-form-input
                  id="contactNo"
                  v-model="newAddress.tel"
                  placeholder="Contact Number"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Street Address"
                label-for="street"
              >
                <b-form-input
                  id="street"
                  v-model="newAddress.address"
                  placeholder="Street Address"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Suburb"
                label-for="suburb"
              >
                <b-form-input
                  id="suburb"
                  v-model="newAddress.suburb"
                  placeholder="Suburb"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="City"
                label-for="mc-city"
              >
                <b-form-input
                  id="mc-city"
                  v-model="newAddress.city"
                  placeholder="City"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Country"
                label-for="country"
              >
                <b-form-input
                  id="country"
                  v-model="newAddress.country"
                  placeholder="Country"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Postcode"
                label-for="postcode"
              >
                <b-form-input
                  id="postcode"
                  v-model="newAddress.postcode"
                  placeholder="Postcode"
                />
              </b-form-group>
            </b-col>
            <b-col
              v-if="!newAddress.is_sender"
              cols="12"
            >
              <b-form-group
                label="Commercial Clearance Information"
                label-for="CCI"
              >
                <b-form-checkbox
                  id="CCI"
                  :checked="boo"
                  name="check-button"
                  switch
                  inline
                  @change="changeSwitch"
                />
              </b-form-group>
            </b-col>
            <b-col
              v-if="boo"
              md="6"
            >
              <b-form-group
                label="Company"
                label-for="mc-company"
              >
                <div class="form-label-group">
                  <b-form-input
                    id="mc-company"
                    v-model="newAddress.business_name"
                    placeholder="Company"
                  />
                </div>
              </b-form-group>
            </b-col>
            <b-col
              v-if="boo"
              md="6"
            >
              <b-form-group
                label-for="customs_code"
                label="Customs Code"
              >
                <div class="form-label-group">
                  <b-form-input
                    id="customs_code"
                    v-model="newAddress.custom_code"
                    placeholder="Customs Code"
                  />
                </div>
              </b-form-group>
            </b-col>

          </b-row>
        </b-form>
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

          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            block
            @click="onPost"
          >
            {{ $t('Save') }}
          </b-button>

          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
            @click="$router.go(-1)"
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
import router from '@/router'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import {
  BFormGroup, BFormInput, BRow, BCol, BCard, BButton, BForm, VBToggle, BFormCheckbox,
} from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormCheckbox,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BButton,
    BForm,
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
    const isSender = ref(false)
    const boo = ref(false)
    const newAddress = ref({
      is_sender: false,
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
    if (router.currentRoute.params.isSender) {
      isSender.value = router.currentRoute.params.isSender
      console.log(isSender.value)
    }

    store.dispatch('ship2u/fetchAddress', { id: router.currentRoute.params.id, isSender: router.currentRoute.params.isSender })
      .then(response => {
        newAddress.value = response
        console.log(response)
      })
      .catch(error => {
        if (error.response.status === 404) {
          newAddress.value = undefined
        }
      })

    function changeSwitch(e) {
      boo.value = e
      console.log(e)
    }

    function onPost() {
      store.dispatch('ship2u/uptAddress', { obj: newAddress.value, isSender: isSender.value })
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
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-parcel.scss";

.form-item-section {
background-color:$product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: .35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }

  }
}
</style>
