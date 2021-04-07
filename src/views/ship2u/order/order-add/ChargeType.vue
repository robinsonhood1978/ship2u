<template>
  <b-card
    no-body
    class="business-card"
  >

    <b-card-body>
      <div class="business-items">
        <b-form-radio-group
          id="radio-group-2"
          v-model="Selected"
          name="radio-sub-component"
        >
          <div
            v-for="(Item,index) in quote"
            :key="index"
            class="business-item"
          >
            <b-row>
              <b-col cols="4">
                <b-form-radio
                  name="some-radios"
                  :value="index"
                  @change="changeRadio(index)"
                >
                  {{ Item.charge_type.title }}
                </b-form-radio>
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
        </b-form-radio-group>

        <r-detail :items="items" />
        <hr>
        <r-operations
          v-if="curQuote"
          :key="optKey"
          :cur-quote="curQuote"
        />
        <r-notice
          v-if="curQuote"
          :quote="curQuote"
        />
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
// import { mapState } from 'vuex'
import {
  BCard, BCardBody, BFormRadio, BFormRadioGroup, BBadge, BRow, BCol, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import RDetail from './Detail.vue'
import ROperations from './Operations.vue'
import RNotice from './Notice.vue'
// import { ref } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BFormRadio,
    BFormRadioGroup,
    BRow,
    BButton,
    BCol,
    BBadge,
    BCardBody,
    RDetail,
    ROperations,
    RNotice,
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
      Selected: 0,
      optKey: 0,
    }
  },
  computed: {
    // ...mapState('ship2u', [
    //   'quote',
    // ]),
    quote() {
      return store.state.ship2u.quote
    },
    curQuote() {
      let obj = null
      if (store.state.ship2u.quote) {
        obj = store.state.ship2u.quote[this.Selected]
      }
      return obj
    },
  },
  setup() {
    // const Selected = ref('radio-24')
    // console.log(props.items)
    function changeRadio() {
      // console.log(e)
      console.log(this.Selected)
      // console.log(typeof e)
      // console.log(typeof this.Selected)
      this.$emit('changeChargeType', this.Selected)
      // this.curQuote = this.quote[this.Selected]
      this.optKey += 1
    }
    return {
      changeRadio,
    }
  },
}
</script>
