<template>
  <div>
    <form-wizard
      ref="wizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="steps-transparent mb-3"
      @on-change="tabChange"
      @on-complete="formSubmitted"
    >
      <!-- account detail tab -->
      <b-row>
        <b-col cols="12">
          <brief-group
            v-if="currentStep>0"
            :key="briefKey"
            :items="bItems"
            :tab="currentStep"
          />
        </b-col>
      </b-row>
      <tab-content
        title="Type"
        icon="feather icon-file-text"
        :before-change="validationType"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Freight Order Type
            </h5>
            <small class="text-muted">
              Choose Your Freight Order Type.
            </small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-inline-spacing">
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="S"
                >
                  Ocean Shipping
                </b-form-radio>
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="F"
                >
                  Air Transport
                </b-form-radio>
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="C"
                >
                  Return
                </b-form-radio>

              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- personal details -->
      <tab-content
        title="Parcels"
        icon="feather icon-user"
        :before-change="validationParcel"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Parcels
            </h5>
            <small class="text-muted">Choose Your Parcels.</small>
          </b-col>
          <b-col md="12">
            <check-parcel @changeOrderParcels="changeParcel" />
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content
        title="Address"
        icon="feather icon-map-pin"
        :before-change="validationAddress"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Address
            </h5>
            <small class="text-muted">Enter Your Address.</small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-inline-spacing">
                <b-form-radio
                  v-model="isRedeliver"
                  name="is_redeliver"
                  value="true"
                  @change="changeRedeliver"
                >
                  Transit
                </b-form-radio>
                <b-form-radio
                  v-model="isRedeliver"
                  name="is_redeliver"
                  value="false"
                  @change="changeRedeliver"
                >
                  Direct Delivery
                </b-form-radio>

              </div>
              <div v-show="!isRedeliver">
                <hr>
                <b-card
                  v-if="defaultSenderAddress"
                  header="Shipper's Address"
                  :title="defaultSenderAddress.title"
                  class="mb-4"
                >
                  <b-card-text>
                    {{ defaultSenderAddress.address }}, {{ defaultSenderAddress.suburb }}, {{ defaultSenderAddress.city }} {{ defaultSenderAddress.postcode }}
                  </b-card-text>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-modal.shipper_address
                    variant="outline-primary"
                  >
                    Change
                  </b-button>
                  <b-modal
                    id="shipper_address"
                    ok-only
                    ok-title="OK"
                    centered
                    size="xl"
                    title="Choose the shipper's address "
                  >
                    <sender-address-list
                      :is-modal="true"
                      @changeShipperAddress="changeShipper"
                    />
                  </b-modal>
                </b-card>
              </div>
              <hr>
              <b-card
                v-if="defaultShippingAddress"
                header="Receiver's Address"
                :title="defaultShippingAddress.title"
                class="mb-4"
              >
                <b-card-text>
                  {{ defaultShippingAddress.address }}, {{ defaultShippingAddress.suburb }}, {{ defaultShippingAddress.city }} {{ defaultShippingAddress.postcode }}
                </b-card-text>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  v-b-modal.shipping_address
                  variant="outline-primary"
                >
                  Change
                </b-button>
                <b-modal
                  id="shipping_address"
                  ok-only
                  ok-title="OK"
                  centered
                  size="xl"
                  title="Choose the receiver's address "
                >
                  <shipping-address-list
                    :is-modal="true"
                    @changeShippingAddress="changeShipping"
                  />
                </b-modal>
              </b-card>
              <hr>
              <b-card title="Whether to pick up the goods by myself">
                <!-- checkbox -->
                <b-form-checkbox
                  v-model="order.is_pickup"
                >
                  Pick up by Myself
                </b-form-checkbox>
              </b-card>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- social link -->
      <tab-content
        title="Services"
        icon="feather icon-link"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Services
            </h5>
            <small class="text-muted">Choose Services</small>
          </b-col>
          <b-col md="12">
            <charge-type
              v-if="currentStep===3"
              :key="chargeKey"
              :items="bItems"
              @changeChargeType="changeCType"
            />
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import store from '@/store'
import { ref, computed } from '@vue/composition-api'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormRadio,
  BFormCheckbox,
  BCard,
  BCardText,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { EventBus } from '@/ship2u/utils/global'
import CheckParcel from './CheckParcel.vue'
import ChargeType from './ChargeType.vue'
import BriefGroup from './BriefGroup.vue'
import SenderAddressList from '../../address/shipping-list/SenderAddressList.vue'
import ShippingAddressList from '../../address/shipping-list/ShippingAddressList.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BFormRadio,
    BRow,
    BCol,
    BFormGroup,
    BFormCheckbox,
    BCard,
    BCardText,
    BButton,
    BriefGroup,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    CheckParcel,
    SenderAddressList,
    ShippingAddressList,
    ChargeType,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      quote: null,
      briefKey: 0,
      // chargeTypeId: -1,
      // bItems: null,
      chargeKey: 0,
      agree: false,
    }
  },
  computed: {
  },
  created() {
    EventBus.$on('listenAgree', e => {
      this.agree = e
    })
    EventBus.$on('listenOperations', e => {
      this.order.operations = e
    })
  },
  mounted() {
    // console.log(this.currentStep)
  },
  methods: {
    isLastStep() {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep
      }
      return false
    },
    validationAddress() {
      let boo = false
      // console.log(this.order.sender_address_id)
      // console.log(this.order.receiver_address_id)
      if (this.order.sender_address_id === -1 || this.order.receiver_address_id === -1) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'BellIcon',
            text: '👋 The address information is incorrect.',
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        store.dispatch('ship2u/quote', { order: this.order })
          .then(res => {
            this.quote = res
            // console.log(res)
          })
        boo = true
      }
      return boo
    },
    validationParcel() {
      let boo = false
      // console.log(this.order.parcel_ids.length)
      if (this.order.parcel_ids.length === 0) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'BellIcon',
            text: '👋 No parcel selected.',
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        boo = true
      }
      return boo
    },
    changeParcel(val) {
      this.order.parcel_ids = val
      // console.log(this.order.parcel_ids)
      this.briefKey += 1
    },
    // getBrief(val) {
    //   this.bItems = val
    //   console.log(this.bItems)
    //   this.chargeKey += 1
    // },
    async validationType() {
      let boo = false
      if (this.order.freight_type === '') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'BellIcon',
            text: '👋 No type selected.',
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        boo = true
      }
      // console.log(this.currentStep)
      return boo
    },
    formSubmitted() {
      if (this.agree && this.quote) {
        // Object.defineProperty(this.order, 'charge_type', this.quote[this.chargeTypeId].charge_type.id)
        // eslint-disable-next-line prefer-const,prefer-destructuring
        // let order = this.order
        // console.log(this.chargeTypeId)
        this.order.charge_type = this.quote[this.chargeTypeId].charge_type.id
        // console.log(this.order)
        this.$store.dispatch('ship2u/newOrder', { order: this.order })
          .then(res => {
            console.log(res)
            if (res) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Form Submitted',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })

              setTimeout(() => {
                this.$router.push({
                  name: 'order-list',
                })
              }, 3000)
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Warning',
                  icon: 'BellIcon',
                  text: 'Fail.',
                  variant: 'warning',
                },
              }, { position: 'top-center' })
            }
          })
        // console.log(this.chargeTypeId)
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'BellIcon',
            text: 'If you cannot agree to the above precautions, we will not be able to generate a new freight order for you.',
            variant: 'warning',
          },
        }, { position: 'top-center' })
      }
    },
    tabChange(prevIndex, nextIndex) {
      // console.log(`${prevIndex},${nextIndex}`)
      // console.log(this.$refs.wizard.activeTabIndex)
      this.currentStep = nextIndex
    },
  },
  setup() {
    const isRedeliver = ref(false)
    const defaultSenderAddress = ref(null)
    const defaultShippingAddress = ref(null)
    const order = ref({
      // charge_type: -1,
      lang: 'en-us',
      title: '',
      freight_type: '',
      parcel_ids: [],
      is_pickup: false,
      receiver_address_id: -1,
      sender_address_id: -1,
      operations: [],
      description: '',
    })
    store
      .dispatch('ship2u/defaultSenderAddress')
      .then(response => {
        defaultSenderAddress.value = response
        order.value.sender_address_id = defaultSenderAddress.value.id
        // console.log(defaultSenderAddress.value)
      })
    store
      .dispatch('ship2u/defaultShippingAddress')
      .then(response => {
        defaultShippingAddress.value = response
        order.value.receiver_address_id = defaultShippingAddress.value.id
        // console.log(defaultShippingAddress.value)
      })
    const chargeTypeId = ref(0)
    const currentStep = ref(0)
    const bItems = computed(() => {
      const items = [
        {
          icon: 'ArchiveIcon',
          color: 'light-primary',
          title: '0',
          unit: 'P',
          subtitle: 'Parcels',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-info',
          title: '0',
          unit: 'M3',
          subtitle: 'Volumn',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'AnchorIcon',
          color: 'light-danger',
          title: '0',
          unit: 'KG',
          subtitle: 'Weight',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'PackageIcon',
          color: 'light-warning',
          title: '0',
          unit: 'KG',
          subtitle: 'M. Volume',
          customClass: '',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '0',
          unit: 'NZD',
          subtitle: 'Price',
          customClass: '',
        },
      ]
      // console.log(currentStep.value)
      const { parcels, quote } = store.state.ship2u
      // console.log(parcels)
      // console.log(props.pids)
      if (parcels) {
        const selectedParcels = parcels.filter(p => order.value.parcel_ids.includes(p.id))

        if (selectedParcels.length > 0) {
          let pieces = 0
          let volume = 0
          let weight = 0
          let price = 0
          selectedParcels.forEach(i => {
            pieces += i.pieces
            volume += i.volume
            weight += i.weight
            price += i.total
          })
          items[0].title = pieces
          items[1].title = volume.toFixed(3)
          items[2].title = weight.toFixed(1)
          let av = (volume / 0.005).toFixed(1)
          if (quote && chargeTypeId.value > -1 && pieces > 0 && currentStep.value === 3) {
            av = quote[chargeTypeId.value].weight.toFixed(1)
          }
          items[3].title = av
          items[4].title = price.toFixed(2)
          // console.log(chargeTypeId.value)

          // console.log(av)
        }

      // emit('briefItems', items.value)
      }
      return items
    })

    function changeCType(ctId) {
      this.chargeTypeId = ctId
      console.log(ctId)
      this.briefKey += 1
    }
    function changeShipper(id) {
      // console.log(id)
      store.dispatch('ship2u/fetchAddress', { id, isSender: true })
        .then(response => {
          defaultSenderAddress.value = response
          order.value.sender_address_id = defaultSenderAddress.value.id
          // console.log(order.value.sender_address_id)
        })
    }
    function changeShipping(id) {
      // console.log(id)
      store.dispatch('ship2u/fetchAddress', { id, isSender: false })
        .then(response => {
          defaultShippingAddress.value = response
          order.value.receiver_address_id = defaultShippingAddress.value.id
          // console.log(order.value.receiver_address_id)
        })
    }
    function changePickup() {
      // console.log(order.value.is_pickup)
    }
    function changeRedeliver(e) {
      isRedeliver.value = (e === 'true')
      // console.log(typeof isRedeliver.value)
      // console.log(isRedeliver.value)
    }
    return {
      currentStep,
      bItems,
      order,
      defaultSenderAddress,
      defaultShippingAddress,
      changeShipper,
      changeShipping,
      changePickup,
      changeRedeliver,
      isRedeliver,
      changeCType,
      chargeTypeId,
    }
  },
}
</script>
