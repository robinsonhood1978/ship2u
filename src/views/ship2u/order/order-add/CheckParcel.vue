<template>
  <b-card
    no-body
    class="business-card"
  >

    <b-card-body>
      <div class="business-items">
        <b-form-checkbox-group
          id="checkbox-group"
          v-model="selected"
          name="flavour"
        >
          <div
            v-for="Item in parcelsList"
            :key="Item.id"
            class="business-item"
          >
            <b-row>
              <b-col>
                <b-form-checkbox
                  :value="Item.id"
                  checked="false"
                  @change="changeCheck"
                >
                  {{ Item.title }}
                </b-form-checkbox>
              </b-col>
              <b-col>
                {{ Item.weight.toFixed(2) }} KG
              </b-col>
              <b-col>

                <b-button variant="light">
                  Value of Goods
                  <b-badge variant="primary">
                    $ {{ Item.total }} <span class="sr-only">unread messages</span>
                  </b-badge>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-form-checkbox-group>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BFormCheckbox, BBadge, BRow, BCol, BButton, BFormCheckboxGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import store from '@/store'

export default {
  components: {
    BCard,
    BRow,
    BFormCheckboxGroup,
    BButton,
    BCol,
    BBadge,
    BCardBody,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: [],
    }
  },
  setup() {
    const parcelsList = ref([])
    function changeCheck() {
      // console.log(e.toString())
      // console.log(this.selected.toString())
      this.$emit('changeOrderParcels', this.selected)
    }
    store
      .dispatch('ship2u/refreshParcels', {
        state: 'P',
        unsent: 1,
        count: 0,
      })
      .then(parcels => {
        parcelsList.value = parcels
        // console.log(parcels)
      })
    return {
      parcelsList,
      changeCheck,
    }
  },
}
</script>
