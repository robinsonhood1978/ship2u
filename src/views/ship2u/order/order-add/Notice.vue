<template>
  <b-card
    border-variant="info"
    bg-variant="transparent"
    class="shadow-none"
  >
    <b-card-header class="pb-1">
      <b-card-title>User Notice</b-card-title>
    </b-card-header>

    <b-card-body>

      <div
        v-for="dec in quote.charge_type.declarations"
        :key="dec.id"
      >
        <h6 class="mb-75">
          {{ dec.title }}
        </h6>
        <b-card-text>{{ dec.description }}</b-card-text>
        <div class="business-items">
          <div class="d-flex align-items-center justify-content-between">
            <b-form-checkbox
              checked="false"
              @change="changeAgree"
            >
              I agreed
            </b-form-checkbox>
          </div>
        </div>
      </div>
      <br><br>
      <b-card
        border-variant="warning"
        bg-variant="transparent"
        class="shadow-none"
      >
        <b-card-text>In order to avoid delays in subsequent processing, please choose the most suitable billing method.
          <br>
          If you are not sure, please contact customer service to confirm the change after generating the freight order.
        </b-card-text>
      </b-card>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { EventBus } from '@/ship2u/utils/global'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BCardText,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  props: {
    quote: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
    }
  },
  methods: {
    changeAgree(e) {
      // console.log(e)
      // console.log(this.selected.toString())
      EventBus.$emit('listenAgree', e)
    },
  },
  setup(props) {
    console.log(props.quote)
  },
}
</script>
