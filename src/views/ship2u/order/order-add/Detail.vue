<template>
  <b-card
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Cargo Details</b-card-title>
    </b-card-header>

    <b-card-body>
      <div
        v-for="(item,index) in items"
        :key="index"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              :variant="item.color"
            >
              <feather-icon
                size="18"
                :icon="item.icon"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body class="my-auto">
            <h6 class="transaction-title">
              {{ item.subtitle }}
            </h6>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
        >
          <span :class="(index%2===0) ? 'text-danger':'text-success'">{{ item.title }}</span> <span :variant="item.color">
            {{ item.unit }}
          </span>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
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
  setup() {
    // const Selected = ref('radio-24')
    // console.log(props.items)
  },
}
</script>
