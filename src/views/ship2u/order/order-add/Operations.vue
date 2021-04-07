<template>
  <b-card
    no-body
    class="business-card"
  >
    <b-card-header class="pb-1">
      <b-card-title>Optional Service</b-card-title>
    </b-card-header>

    <b-card-body>
      <div class="business-items">
        <b-form-checkbox-group
          id="checkbox-group"
          v-model="selected"
          name="op"
        >
          <div
            v-for="opt in curQuote.operation_types"
            :key="opt.id"
            class="business-item"
          >
            <div class="d-flex align-items-center justify-content-between">
              <b-form-checkbox
                :value="opt.id"
                :checked="opt.checked"
                @change="changeCheck"
              >
                {{ opt.title }}
              </b-form-checkbox>
              <b-badge variant="light-success">
                +${{ opt.amount.toFixed(2) }}
              </b-badge>
            </div>
          </div>
        </b-form-checkbox-group>
      </div>
    </b-card-body>
    <r-price-detail
      :key="pdKey"
      :quote="curQuote"
      :service-ids="selected"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BFormCheckbox, BBadge, BFormCheckboxGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { EventBus } from '@/ship2u/utils/global'
import RPriceDetail from './PriceDetail.vue'
// import RNotice from './Notice.vue'

export default {
  components: {
    BCard,
    BBadge,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BFormCheckbox,
    BFormCheckboxGroup,
    RPriceDetail,
    // RNotice,
  },
  directives: {
    Ripple,
  },
  props: {
    curQuote: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selected: [],
      pdKey: 0,
    }
  },
  computed: {
  },
  setup() {
    // if (props.curQuote) {
    //   props.curQuote.operation_types.forEach(item => {
    //   // eslint-disable-next-line no-param-reassign
    //     item.checked = false
    //   })
    // }

    // console.log(props.curQuote)
    function changeCheck() {
      // console.log(e.toString())
      // console.log(this.selected.toString())
      this.pdKey += 1
      EventBus.$emit('listenOperations', this.selected)
    }
    return {
      changeCheck,
      // watchAgree,
    }
  },
}
</script>
