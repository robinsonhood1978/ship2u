<template>
  <section class="order-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="orderData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching order data
      </h4>
      <div class="alert-body">
        No order found with this order id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'ship2u-order-list'}"
        >
          Order List
        </b-link>
        for other orders.
      </div>
    </b-alert>

    <b-row
      v-if="orderData"
      class="order-preview"
    >

      <!-- Col: Left (Order Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-card
          no-body
          class="order-preview-card"
        >
          <!-- Header -->
          <b-card-body class="order-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column order-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <span class="brand-logo">
                    <b-img
                      :src="appLogoImage"
                      alt="logo"
                    />
                  </span>
                  <h3 class="text-primary order-logo">
                    {{ orderData.title }}
                  </h3>
                </div>
                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Date Created') }}:
                  </p>
                  <p class="order-date">
                    {{ $DateFormat(orderData.create_time) }}
                  </p>
                </div>
                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Charge Type') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.charge_type.title_en_us }}
                  </p>
                </div>

                <div
                  v-for="(item, index) in orderData.operations"
                  :key="index"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ item.type.title }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ item.amount }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Transportation Costs') }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ orderData.shipping_cost }} (Including Delivery Fee: NZD ${{ orderData.dest_shipping_cost }})
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Overall Price') }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ orderData.total }}
                  </p>
                </div>

              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 class="order-title">
                  {{ $t('Order') }}
                  <span class="order-number">#{{ orderData.id }}</span>
                </h4>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Note -->
          <b-card-body class="order-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column order-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Number of Items') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.pieces }} {{ $t('Pieces') }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Declared value') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.price }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Volume') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.volume.toFixed(3) }} M3
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Weight') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.net_weight }} KG
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Material Volume') }}:
                  </p>
                  <p class="order-date">
                    {{ $VolWeightFlight(orderData.volume) }} KG
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Chargeable Weight') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.weight.toFixed(2) }} KG
                  </p>
                </div>
              </div>

            </div>
          </b-card-body>
          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Order Description: Table -->
          <b-table-lite
            responsive
            :items="orderDescription"
            :fields="ItemColumns"
          >
            <template #cell(title)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.title }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Order Description: Total -->
          <b-card-body class="order-padding pb-0">
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
                <div class="order-total-wrapper">
                  <hr class="my-50">
                  <div class="order-total-item">
                    <p class="order-total-title">
                      {{ $t('Total') }}:
                    </p>
                    <p class="order-total-amount">
                      {{ totalPrice }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Note -->
          <b-card-body class="order-padding pt-0">
            <span class="font-weight-bold">{{ $t('Customer Note') }}: </span>
            <span>{{ orderData.customer_note }}</span>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="order-actions"
      >
        <b-card>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printOrder"
          >
            Print
          </b-button>

          <!-- Button: Add Payment -->
          <b-button
            v-b-toggle.sidebar-order-add-payment
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="$router.go(-1)"
          >
            Back
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
// import orderStoreModule from '../orderStoreModule'

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
    const orderData = ref(null)
    const paymentDetails = ref({})
    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    function trans(val) {
      return i18n.t(val)
    }

    const ItemColumns = computed(() => [
      { key: 'title', label: trans('Item Name'), sortable: true },
      // { key: 'local_courier_number', label: trans('Local Courier Number'), sortable: false },
      // { key: 'orderStatus', sortable: true },
      { key: 'pieces', label: trans('Pieces'), sortable: true },
      { key: 'volumn', label: trans('Volumn'), sortable: true },
      { key: 'weight', label: trans('Weight'), sortable: true },
      { key: 'total', label: trans('Total Price'), sortable: true },
    ])

    // Order Description
    // ? Your real data will contain this information
    const orderDescription = computed(() => orderData.value.parcels)

    const totalPrice = computed(() => {
      let total = 0
      orderDescription.value.forEach(i => {
        total += (parseFloat(i.total) || 0)
      })

      return total.toFixed(2)
    })

    // const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-orders'

    // // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, orderStoreModule)

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    // })

    store.dispatch('ship2u/fetchOrder', { id: router.currentRoute.params.id })
      .then(response => {
        orderData.value = response
      // orderDescription.value = response.orderdetail_set
      })
      .catch(error => {
        if (error.response.status === 404) {
          orderData.value = undefined
        }
      })

    const printOrder = () => {
      window.print()
    }

    return {
      orderData,
      paymentDetails,
      orderDescription,
      printOrder,
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
@import "~@core/scss/base/pages/app-order.scss";
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

  // Order Specific Styles
  .order-preview-wrapper {
    .row.order-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .order-preview-card {
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
    .order-actions {
      display: none;
    }
  }
}
</style>
