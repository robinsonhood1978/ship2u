<template>
  <section class="parcel-preview-wrapper">

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
      class="parcel-preview"
    >

      <!-- Col: Left (Parcel Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
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
              <div class="mt-md-0 mt-2">
                <h4 class="parcel-title">
                  {{ $t('Parcel') }}
                  <span class="parcel-number">#{{ parcelData.id }}</span>
                </h4>
                <div class="parcel-date-wrapper">
                  <p class="parcel-date-title">
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

          <!-- Parcel Description: Table -->
          <b-table-lite
            responsive
            :items="parcelDescription"
            :fields="ItemColumns"
          >
            <template #cell(title)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.title }}
              </b-card-text>
            </template>
          </b-table-lite>

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
            <span>{{ parcelData.customer_note }}</span>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="parcel-actions"
      >
        <b-card>

          <!-- Button: Edit -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            :to="{ name: 'ship2u-parcel-edit', params: { id: $route.params.id } }"
          >
            Edit
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printParcel"
          >
            Print
          </b-button>

        </b-card>
      </b-col>
    </b-row>

  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import i18n from '@/libs/i18n'
import {
  BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { $themeConfig } from '@themeConfig'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    BImg,
  },
  setup() {
    const parcelData = ref(null)
    const paymentDetails = ref({})
    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    function trans(val) {
      return i18n.t(val)
    }

    const ItemColumns = computed(() => [
      { key: 'title', label: trans('Item Name'), sortable: true },
      { key: 'reference', label: trans('Material'), sortable: false },
      // { key: 'parcelStatus', sortable: true },
      { key: 'quantity', label: trans('Pieces'), sortable: true },
      { key: 'subtotal', label: trans('Total Price'), sortable: true },
    ])

    // Parcel Description
    // ? Your real data will contain this information
    const parcelDescription = computed(() => parcelData.value.orderdetail_set)

    const totalPrice = computed(() => {
      let total = 0
      parcelDescription.value.forEach(i => {
        total += (parseFloat(i.subtotal) || 0)
      })

      return total.toFixed(2)
    })

    // const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-parcels'

    // // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, parcelStoreModule)

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    // })

    store.dispatch('ship2u/fetchParcel', { id: router.currentRoute.params.id })
      .then(response => {
        parcelData.value = response
      // parcelDescription.value = response.orderdetail_set
      })
      .catch(error => {
        if (error.response.status === 404) {
          parcelData.value = undefined
        }
      })

    const printParcel = () => {
      window.print()
    }

    return {
      parcelData,
      paymentDetails,
      parcelDescription,
      printParcel,
      // App Name
      appName,
      appLogoImage,
      ItemColumns,
      totalPrice,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-parcel.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Parcel Specific Styles
  .parcel-preview-wrapper {
    .row.parcel-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .parcel-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .parcel-actions {
      display: none;
    }
  }
}
</style>
