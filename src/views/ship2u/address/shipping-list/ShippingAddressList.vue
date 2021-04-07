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
            :to="{ name: 'ship2u-shipping-address-add'}"
          >
            {{ $t('Add Shipping Address') }}
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
              class="addresse-filter-select"
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
      :items="fetchAddresses"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <template #head(addresseStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'ship2u-address-preview', params: { id: data.item.id, isSender: false }}"
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

      <template #cell(city)="data">
        <span class="text-nowrap">
          <b-form-checkbox
            :value="data.item.id"
            :checked="data.item.default"
            name="check-button"
            switch
            inline
            @change="changeSwitch($event,data.item.id)"
          /></span>
      </template>

      <template #cell(state)="data">
        <span class="text-nowrap">
          <b-form-checkbox
            :value="data.item.id"
            checked="false"
            name="check-button"
            switch
            inline
            @change="useSwitch($event,data.item.id)"
          /></span>
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
            :id="`addresse-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'ship2u-address-preview', params: { id: data.item.id, isSender: data.item.is_sender }})"
          />
          <b-tooltip
            title="Preview Order"
            :target="`addresse-row-${data.item.id}-preview-icon`"
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
            <b-dropdown-item :to="{ name: 'apps-invoice-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="Del(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
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
            :total-rows="totalAddresses"
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
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BLink, BFormCheckbox, BDropdown, BDropdownItem,
  BPagination, BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import i18n from '@/libs/i18n'
import store from '@/store'
import addressList from './ShippingAddressList'

// import addressStoreModule from '../addressStoreModule'

export default {
  components: {
    BCard,
    BDropdown,
    BDropdownItem,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BLink,
    BPagination,
    BTooltip,
    BFormCheckbox,

    vSelect,
  },
  props: {
    isModal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-addresses'

    // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, addressStoreModule)

    // UnRegister on leave
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
    const tableColumns = ref([
      { key: 'id', label: '#', sortable: true },
      { key: 'title', label: trans('title'), sortable: true },
      { key: 'address', sortable: true },
      { key: 'suburb', label: trans('suburb'), sortable: true },
      { key: 'city', label: trans('default'), sortable: true },
      { key: 'state', label: trans('if_use'), sortable: true },
      { key: 'actions', label: trans('actions') },
    ])
    if (!props.isModal) {
      tableColumns.value = [
        { key: 'id', label: '#', sortable: true },
        { key: 'title', label: trans('title'), sortable: true },
        { key: 'address', sortable: true },
        { key: 'suburb', label: trans('suburb'), sortable: true },
        { key: 'city', label: trans('default'), sortable: true },
        { key: 'actions', label: trans('actions') },
      ]
    }
    const {
      fetchAddresses,
      perPage,
      currentPage,
      totalAddresses,
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
    } = addressList()

    function changeSwitch(e, id) {
      console.log(this.isModal)
      console.log(e)
      console.log(id)
      if (!e) {
        // eslint-disable-next-line no-param-reassign
        id = ''
      }
      const addr = store.state.ship2u.shippingAddresses
      addr.forEach(i => {
        // eslint-disable-next-line no-param-reassign
        i.default = (i.id === e) ? i.id : false
        // console.log(i)
      })
      store
        .dispatch('ship2u/updateDefaultAddress', {
          isSender: false,
          addrId: id,
        })
        .then(response => {
          console.log(response)
          fetchAddresses.value = addr
          store.commit('ship2u/setShippingAddresses', addr)
          console.log(fetchAddresses.value)
        })
        .catch(ex => {
          console.log(ex)
        })
    }
    function useSwitch(e, id) {
      console.log(this.isModal)
      console.log(e)
      console.log(id)
      this.$emit('changeShippingAddress', id)
      this.$bvModal.hide('shipping_address')
    }
    function Del(id) {
      store
        .dispatch('ship2u/delAddress', {
          isSender: false,
          id,
        })
        .then(() => {
          refOrderListTable.value.refresh()
        })
        .catch(ex => {
          console.log(ex)
        })
      console.log(id)
    }
    return {
      fetchAddresses,
      tableColumns,
      perPage,
      currentPage,
      totalAddresses,
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
      changeSwitch,
      useSwitch,
      resolveOrderStatusVariantAndIcon,
      resolveClientAvatarVariant,
      Del,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.address-filter-select {
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
