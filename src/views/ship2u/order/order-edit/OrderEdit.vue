<template>
  <section class="parcel-add-wrapper">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="parcelData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching parcel data
      </h4>
      <div class="alert-body">
        No parcel found with this parcel id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'ship2u-parcel-list'}"
        >
          Parcel List
        </b-link>
        for other parcels.
      </div>
    </b-alert>

    <b-row
      v-if="parcelData"
      class="parcel-add"
    >

      <!-- Col: Left (Parcel Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-form @submit.prevent>
          <b-card
            no-body
            class="parcel-preview-card"
          >
            <!-- Header -->
            <b-card-body class="parcel-padding pb-0">

              <div class="d-flex justify-content-between flex-md-row flex-column parcel-spacing mt-0">

                <!-- Header: Left Content -->
                <div>
                  <div class="logo-wrapper">
                    <span class="brand-logo">
                      <b-img
                        :src="appLogoImage"
                        alt="logo"
                      />
                    </span>
                    <h3 class="text-primary parcel-logo">
                      {{ parcelData.title }}
                    </h3>
                  </div>
                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Local Courier Name') }}:
                    </p>
                    <p class="parcel-date">
                      {{ parcelData.local_courier_name }}
                    </p>
                  </div>

                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Local Courier Number') }}:
                    </p>
                    <p class="parcel-date">
                      {{ parcelData.local_courier_number }}
                    </p>
                  </div>

                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Number of Items') }}:
                    </p>
                    <p class="parcel-date">
                      {{ parcelData.pieces }} {{ $t('Pieces') }}
                    </p>
                  </div>

                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Volume') }}:
                    </p>
                    <p class="parcel-date">
                      {{ parcelData.volume.toFixed(3) }} M3
                    </p>
                  </div>

                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Weight') }}:
                    </p>
                    <p class="parcel-date">
                      {{ parcelData.weight }} KG
                    </p>
                  </div>

                  <div class="parcel-date-wrapper">
                    <p class="parcel-date-title">
                      {{ $t('Material Volume') }}:
                    </p>
                    <p class="parcel-date">
                      {{ $VolWeightFlight(parcelData.volume) }} KG
                    </p>
                  </div>
                </div>

                <!-- Header: Right Content -->
                <div class="parcel-number-date mt-md-0 mt-2">
                  <div class="d-flex align-items-center justify-content-md-end mb-1">
                    <h4 class="parcel-title">
                      {{ $t('Parcel') }}
                    </h4>
                    <b-input-group class="input-group-merge parcel-edit-input-group disabled">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="parcel-data-id"
                        v-model="parcelData.id"
                        disabled
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <br><br><br>
                    <p class="title">
                      {{ $t('Date Received') }}:
                    </p>
                    <p class="parcel-date">
                      {{ $DateFormat(parcelData.receive_time) }}
                    </p>
                  </div>
                </div>
              </div>
            </b-card-body>

            <!-- Spacer -->
            <hr class="parcel-spacing">

            <!-- Items Section -->
            <b-card-body class="parcel-padding form-item-section">
              <div
                ref="form"
                class="repeater-form"
                :style="{height: trHeight}"
              >
                <b-row
                  v-for="(item, index) in parcelData.orderdetail_set"
                  :key="index"
                  ref="row"
                  class="pb-2"
                >

                  <!-- Item Form -->
                  <!-- ? This will be in loop => So consider below markup for single item -->
                  <b-col cols="12">

                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-none d-lg-flex">
                      <b-row class="flex-grow-1 px-1">
                        <!-- Single Item Form Headers -->
                        <b-col
                          cols="12"
                          lg="5"
                        >
                          {{ $t('Item Name') }}
                        </b-col>
                        <b-col
                          cols="12"
                          lg="3"
                        >
                          {{ $t('Material') }}
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          {{ $t('Pieces') }}
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          {{ $t('Total Price') }}
                        </b-col>
                      </b-row>
                      <div class="form-item-action-col" />
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
                        <b-col
                          cols="12"
                          lg="5"
                        >
                          <b-form-input
                            v-model="item.title"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="3"
                        >
                          <b-form-input
                            v-model="item.reference"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <b-form-input
                            v-model="item.quantity"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <b-form-input
                            v-model="item.subtotal"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                      </b-row>
                      <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                        <feather-icon
                          size="16"
                          icon="XIcon"
                          class="cursor-pointer"
                          @click="removeItem(index)"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                size="sm"
                variant="primary"
                @click="addNewItemInItemForm"
              >
                {{ $t('Add Item') }}
              </b-button>
            </b-card-body>

            <!-- Parcel Description: Total -->
            <b-card-body class="parcel-padding pb-0">
              <b-row>

                <!-- Col: Sales Persion -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
                />

                <!-- Col: Total -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
                >
                  <div class="parcel-total-wrapper">
                    <hr class="my-50">
                    <div class="parcel-total-item">
                      <p class="parcel-total-title">
                        {{ $t('Total') }}:
                      </p>
                      <p class="parcel-total-amount">
                        {{ totalPrice }}
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Spacer -->
            <hr class="parcel-spacing">

            <!-- Note -->
            <b-card-body class="parcel-padding pt-0">
              <span class="font-weight-bold">{{ $t('Customer Note') }}: </span>
              <b-form-textarea v-model="parcelData.customer_note" />
            </b-card-body>
          </b-card>
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
            @click="onPostParcel"
          >
            {{ $t('Save') }}
          </b-button>

          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
            :to="{ name: 'ship2u-parcel-preview', params: { id: $route.params.id } }"
          >
            {{ $t('Preview') }}
          </b-button>

          <!-- Button: Add Payment -->
          <b-button
            v-b-toggle.sidebar-parcel-add-payment
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
          >
            {{ $t('Add to Cart') }}
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { $themeConfig } from '@themeConfig'
import { ref, onUnmounted, computed } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BButton, BForm, BFormInput, BInputGroup, BInputGroupPrepend, BFormTextarea, BAlert, BImg, BLink, VBToggle,
} from 'bootstrap-vue'
import parcelStoreModule from '../orderStoreModule'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BForm,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    BAlert,
    BLink,
    BImg,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],

  // Reset Tr Height if data changes
  watch: {
    // eslint-disable-next-line func-names
    'parcelData.orderdetail_set': function () {
      this.initTrHeight()
    },
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = 'hidden'
      this.parcelData.orderdetail_set.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    removeItem(index) {
      this.parcelData.orderdetail_set.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0)
      })
    },
  },
  setup() {
    // App Name
    const { appLogoImage } = $themeConfig.app
    const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-parcels'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, parcelStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const parcelData = ref(null)

    store.dispatch('ship2u-parcels/fetchParcel', { id: router.currentRoute.params.id })
      .then(response => {
        parcelData.value = response
      })
      .catch(error => {
        if (error.response.status === 404) {
          parcelData.value = undefined
        }
      })

    const itemFormBlankItem = {
      title: null,
      reference: '',
      quantity: 0,
      subtotal: 0,
    }

    const totalPrice = computed(() => {
      let total = 0
      parcelData.value.orderdetail_set.forEach(i => {
        total += (parseFloat(i.subtotal) || 0)
      })

      return total.toFixed(2)
    })

    const formData = computed(() => {
      const data = {
        id: parcelData.value.id,
        title: parcelData.value.title,
        customer_note: parcelData.value.customer_note,
        titles: [],
        quantities: [],
        totals: [],
        materials: [],
      }
      parcelData.value.orderdetail_set.forEach(i => {
        data.titles.push(i.title)
        data.quantities.push(i.quantity)
        data.materials.push(i.reference)
        data.totals.push(i.subtotal)
      })
      data.titles = JSON.stringify(data.titles)
      data.quantities = JSON.stringify(data.quantities)
      data.materials = JSON.stringify(data.materials)
      data.totals = JSON.stringify(data.totals)
      return data
    })

    function onPostParcel() {
      // console.log(formData.value)
      // console.log(parcelData.value)
      store.dispatch('ship2u-parcels/saveParcel', { obj: formData.value, parcel: parcelData.value })
        .then(response => {
          console.log(response)
          // parcelData.value = response
          // parcelDescription.value = response.orderdetail_set
          this.$bvModal.msgBoxOk('Data was submitted successfully', {
            title: 'Confirmation',
            // size: 'sm',
            // buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            // centered: true,
          })
            .then(() => {
              this.$router.go(-1)
            })
            .catch(err => {
            // An error occurred
              console.log(err)
            })
        })
        .catch(error => {
          if (error.response.status === 404) {
            parcelData.value = undefined
          }
        })
      // editParcel(formData.value)
    }

    return {
      parcelData,
      totalPrice,
      onPostParcel,
      itemFormBlankItem,
      appLogoImage,
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
