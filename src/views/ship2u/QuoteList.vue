<template>
  <b-card
    no-body
    class="business-card"
  >

    <b-card-body>
      <div class="business-items">
        <div
          v-for="(Item,index) in items"
          :key="index"
          class="business-item"
        >
          <b-row>
            <b-col cols="4">
              {{ Item.charge_type.title }}
            </b-col>
            <b-col cols="5">
              {{ Item.charge_type.subtitle }} KG
            </b-col>
            <b-col cols="3">

              <b-button variant="light">
                NZD
                <b-badge variant="primary">
                  $ {{ Item.total.toFixed(2) }}
                </b-badge>
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
// import { mapState } from 'vuex'
import {
  BCard, BCardBody, BBadge, BRow, BCol, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import { ref } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BRow,
    BButton,
    BCol,
    BBadge,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
    }
  },
  computed: {
  },
  setup() {
  },
}
</script>
