<template>
  <section class="order-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="addressData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching address data
      </h4>
      <div class="alert-body">
        No order found with this address id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'ship2u-order-list'}"
        >
          Address List
        </b-link>
        for other orders.
      </div>
    </b-alert>

    <b-row
      v-if="addressData"
      class="order-preview"
    >

      <!-- Col: Left (Address Container) -->
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
                    {{ addressData.title }}
                  </h3>
                </div>

              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 class="order-title">
                  {{ $t('Address') }}
                  <span class="order-number">#{{ addressData.id }}</span>
                </h4>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Description lists horizontal -->
          <b-col cols="12">
            <b-card>
              <dl class="row">
                <dt class="col-sm-4 text-right">
                  {{ $t('Address Description') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.title }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right">
                  {{ $t('First Name') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.firstname }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right">
                  {{ $t('Last Name') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.lastname }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Contact Number') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.tel }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Street No.') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.address }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Suburb') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.suburb }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('City') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.city }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Country') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.country }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Postcode') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.postcode }}
                </dd>
              </dl>
              <dl
                v-if="!addressData.is_sender && addressData.business_name"
                class="row"
              >
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Business Name') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.business_name }}
                </dd>
              </dl>
              <dl
                v-if="!addressData.is_sender && addressData.custom_code"
                class="row"
              >
                <dt class="col-sm-4 text-right text-truncate">
                  {{ $t('Custom Code') }}:
                </dt>
                <dd class="col-sm-8">
                  {{ addressData.custom_code }}
                </dd>
              </dl>
            </b-card>
          </b-col>
          <!--/ Description lists horizontal -->

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

          <!-- Button: Edit -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            :to="{ name: 'ship2u-address-edit', params: { id: $route.params.id, isSender: $route.params.isSender } }"
          >
            Edit
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
  BRow, BCol, BCard, BCardBody, BButton, BAlert, BLink, VBToggle, BImg,
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
    BButton,
    BAlert,
    BLink,
    BImg,
  },
  setup() {
    const addressData = ref(null)
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

    // Address Description
    // ? Your real data will contain this information
    const orderDescription = computed(() => addressData.value.parcels)

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

    store.dispatch('ship2u/fetchAddress', { id: router.currentRoute.params.id, isSender: router.currentRoute.params.isSender })
      .then(response => {
        addressData.value = response
        console.log(response)
      })
      .catch(error => {
        if (error.response.status === 404) {
          addressData.value = undefined
        }
      })

    const printAddress = () => {
      window.print()
    }

    return {
      addressData,
      paymentDetails,
      orderDescription,
      printAddress,
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

  // Address Specific Styles
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
