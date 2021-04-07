<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Overview</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in items"
          :key="item.icon"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                :variant="item.color"
              >
                <feather-icon
                  size="24"
                  :icon="item.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder text-danger mb-0 d-inline-block">
                {{ item.title }}
              </h4>
              <h5 class="text-info d-inline-block">
                {{ '\xa0\xa0'+item.unit }}
              </h5>

              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
// import { mapState } from 'vuex'
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {
    items: {
      type: Array,
      default: null,
    },
    tab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    //   statisticsItems: [
    //     {
    //       icon: 'ArchiveIcon',
    //       color: 'light-primary',
    //       title: '230k',
    //       subtitle: 'Sales',
    //       customClass: 'mb-2 mb-xl-0',
    //     },
    //     {
    //       icon: 'BoxIcon',
    //       color: 'light-info',
    //       title: '8.549k',
    //       subtitle: 'Customers',
    //       customClass: 'mb-2 mb-xl-0',
    //     },
    //     {
    //       icon: 'AnchorIcon',
    //       color: 'light-danger',
    //       title: '1.423k',
    //       subtitle: 'Products',
    //       customClass: 'mb-2 mb-sm-0',
    //     },
    //     {
    //       icon: 'PackageIcon',
    //       color: 'light-warning',
    //       title: '$9745',
    //       subtitle: 'Revenue',
    //       customClass: '',
    //     },
    //     {
    //       icon: 'DollarSignIcon',
    //       color: 'light-success',
    //       title: '$9745',
    //       subtitle: 'Revenue',
    //       customClass: '',
    //     },
    //   ],
    }
  },
  setup() {
    // console.log(props.tab)
  },
}
</script>
