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
              class="parcel-filter-select"
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
      ref="refInvoiceListTable"
      :items="fetchParcels"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <template #head(parcelStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'ship2u-parcel-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: Images -->
      <template #cell(images)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-img
              :src="data.item.images[0].thumb?require('@/assets/images/flags/en.png'):data.item.images[0].thumb"
              width="50"
              rounded
              height="35"
            />
          </template>
        </b-media>
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
      <template #cell(type)="data">
        <template v-if="data.value === 0">
          <b-badge
            pill
            variant="light-success"
          >
            Paid
          </b-badge>
        </template>
        <template v-else>
          {{ data.value }}
        </template>
      </template>

      <!-- Column: Receive Time -->
      <template #cell(receive_time)="data">
        <span class="text-nowrap">
          {{ $DateFormat(data.item.receive_time) }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">

          <feather-icon
            :id="`parcel-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'ship2u-parcel-preview', params: { id: data.item.id }})"
          />
          <b-tooltip
            title="Preview Invoice"
            :target="`parcel-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'ship2u-parcel-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
          </b-dropdown>
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
            :total-rows="totalParcels"
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
  BCard, BRow, BCol, BFormInput, BTable, BMedia, BImg, BLink,
  BDropdown, BDropdownItem, BPagination, BTooltip,
} from 'bootstrap-vue'
// import router from '@/router'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { computed } from '@vue/composition-api'
import i18n from '@/libs/i18n'
import parcelList from './parcelList'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BMedia,
    BImg,
    BLink,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
  },
  mounted() {
    console.log(111)
    // this.refInvoiceListTable.refresh()
  },
  activated() {
    console.log('activated')
  },
  setup() {
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
      { key: 'images', label: trans('images'), sortable: false },
      // { key: 'parcelStatus', sortable: true },
      { key: 'title', label: trans('title'), sortable: true },
      { key: 'local_courier_name', label: trans('Local Courier Name'), sortable: true },
      { key: 'local_courier_number', label: trans('Local Courier Number'), sortable: true },
      { key: 'receive_time', label: trans('receive time'), sortable: true },
      // { key: 'balance', sortable: true },
      { key: 'actions', label: trans('actions') },
    ])

    const {
      queryParams,
      fetchParcels,
      perPage,
      currentPage,
      totalParcels,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = parcelList()

    console.log(queryParams.value)

    // console.log(window.location.pathname)
    // console.log(router.currentRoute.name.split('_')[0])
    return {
      fetchParcels,
      tableColumns,
      perPage,
      currentPage,
      totalParcels,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,
      setSelected,
      getLabel,
      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.parcel-filter-select {
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
