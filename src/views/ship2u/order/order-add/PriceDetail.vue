<template>
  <b-card
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Price Details</b-card-title>
    </b-card-header>

    <b-card-body>
      <b-card
        class="card-transaction"
        no-body
      >
        <b-card-header>
          <b-card-title>Total</b-card-title>
          <b-card-title class="text-primary">
            {{ total }}
          </b-card-title>
        </b-card-header>
        <b-card-body>
          <div
            v-for="(item,index) in quote.details"
            :key="index"
            class="transaction-item"
          >
            <h6 class="transaction-title">
              {{ item.title }}
            </h6>
            <div
              v-if="!waiting && index===0"
              class="font-weight-bolder"
            >
              <span
                :class="(index%2===0) ? 'text-danger':'text-success'"
              >{{ item.gross.toFixed(2) }}</span> <span variant="light-danger">
                NZD
              </span>
            </div>
            <div
              v-else
              class="font-weight-bolder"
            >
              Waiting
            </div>
          </div>
          <div
            v-for="(item) in checkedOpts"
            :key="item.id"
            class="transaction-item"
          >
            <h6 class="transaction-title">
              {{ item.title }}
            </h6>
            <div
              class="font-weight-bolder"
            >
              <span class="text-danger">{{ item.amount.toFixed(2) }}</span> <span variant="light-info">
                NZD
              </span>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody,
} from 'bootstrap-vue'
// import { ref, computed } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
  },
  props: {
    quote: {
      type: Object,
      default: null,
    },
    serviceIds: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    checkedOpts() {
      let d = []
      if (this.quote) {
        const opts = this.quote.operation_types
        if (this.serviceIds) {
          d = opts.filter(o => this.serviceIds.includes(o.id))
        }
      }
      return d
    },
    waiting() {
      let b = false
      if (this.quote) {
        this.checkedOpts.forEach(i => {
          if (i.need_payment_after_operation) {
            b = true
          }
        })
      }
      return b
    },
    total() {
      if (this.waiting) {
        return 'Waiting'
      }
      let sum = 0
      if (this.quote) {
        sum = parseFloat(this.quote.total.toFixed(2))
      }
      let optsFee = 0
      if (this.checkedOpts.length > 0) {
        this.checkedOpts.forEach(o => {
          optsFee += o.amount
        })
      }
      sum += optsFee
      sum = sum.toFixed(2)
      return `$${sum}`
    },
  },
  setup() {
    // const Selected = ref('radio-24')
    // console.log(props.quote.details)
    // const checkedOpts = ref([])
    // const waiting = ref(false)
    // if (props.quote) {
    //   const opts = props.quote.operation_types
    //   checkedOpts.value = opts.filter(o => props.serviceIds.includes(o.id))
    //   checkedOpts.value.forEach(i => {
    //     if (i.need_payment_after_operation) {
    //       waiting.value = true
    //     }
    //   })
    // }
    // console.log(checkedOpts.value)
    // const total = computed(() => {
    //   if (waiting.value) {
    //     return 'Waiting'
    //   }
    //   let sum = 0
    //   if (props.quote) {
    //     sum = parseFloat(props.quote.total.toFixed(2))
    //   }
    //   let optsFee = 0
    //   if (checkedOpts.value.length > 0) {
    //     checkedOpts.value.forEach(o => {
    //       optsFee += o.amount
    //     })
    //   }
    //   sum += optsFee
    //   sum = sum.toFixed(2)
    //   return `$${sum}`
    // })
    return {
      // checkedOpts,
      // total,
      // waiting,
    }
  },
}
</script>
