<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t('Entries') }}</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
          >
            {{ $t('Add Record') }}
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              :placeholder="$t('Search...')"
            />
            <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :get-option-label="getLabel"
              :reduce="status => status.value"
              class="order-filter-select"
              :placeholder="$t('Select Status')"
              @input="setSelected"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refOrderListTable"
      :items="fetchOrders"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <template #head(orderStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'ship2u-order-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: Title -->
      <template #cell(title)="data">
        <b-media vertical-align="center">
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.title }}
          </span>
        </b-media>
      </template>

      <!-- Column: Type -->
      <template #cell(ifpaid))="data">
        <b-media vertical-align="center">
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.title }}
          </span>
        </b-media>
      </template>

      <!-- Column: Receive Time -->
      <template #cell(create_time)="data">
        <span class="text-nowrap">
          {{ $DateFormat(data.item.create_time) }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">

          <feather-icon
            :id="`order-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'ship2u-order-preview', params: { id: data.item.id }})"
          />
          <b-tooltip
            title="Preview Order"
            placement="left"
            :target="`order-row-${data.item.id}-preview-icon`"
          />

        </div>
      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalOrders"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BLink,
  BPagination, BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { computed } from '@vue/composition-api'
// import store from '@/store'
import i18n from '@/libs/i18n'
import orderList from './orderList'

// import orderStoreModule from '../orderStoreModule'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BLink,
    BPagination,
    BTooltip,

    vSelect,
  },
  setup() {
    // const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-orders'

    // // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, orderStoreModule)

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    // })

    const statusOptions = [
      { label: 'Air freight warehouse', value: 'F' },
      { label: 'Shipping warehouse', value: 'S' },
    ]

    function setSelected() {
      console.log(this.statusFilter)
    }

    function getLabel(val) {
      // console.log(val)
      return this.$t(val.label)
    }

    function trans(val) {
      return i18n.t(val)
    }
    // Table Handlers
    const tableColumns = computed(() => [
      { key: 'id', label: '#', sortable: true },
      { key: 'title', label: trans('title'), sortable: true },
      { key: 'ifpaid', sortable: true },
      { key: 'create_time', label: trans('create time'), sortable: true },
      // { key: 'balance', sortable: true },
      { key: 'actions', label: trans('actions') },
    ])

    const {
      fetchOrders,
      perPage,
      currentPage,
      totalOrders,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refOrderListTable,

      statusFilter,

      refetchData,

      resolveOrderStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = orderList()

    // console.log(fetchOrders)
    // const ComputeOrders = computed(() => {
    //   console.log(fetchOrders.value)
    //   fetchOrders.value.forEach(i => {
    //     // eslint-disable-next-line no-param-reassign
    //     i.ifpaid = (i.paid) ? 'Paid' : 'Unpaid'
    //   })
    //   return fetchOrders
    // })

    return {
      fetchOrders,
      tableColumns,
      perPage,
      currentPage,
      totalOrders,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refOrderListTable,

      statusFilter,

      refetchData,

      statusOptions,
      setSelected,
      getLabel,
      avatarText,
      resolveOrderStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.order-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
