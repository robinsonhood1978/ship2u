export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views/extensions/acl/AccessControl.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/ship2u/home.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Home',
      breadcrumb: [
        {
          text: 'Dashboards',
        },
        {
          text: 'Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/personal',
    name: 'ship2u-personal',
    component: () => import('@/views/ship2u/personal.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Personal Information',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Personal Information',
          active: true,
        },
      ],
    },
  },
  {
    path: '/cost',
    name: 'cost',
    component: () => import('@/views/ship2u/cost.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Cost Calculation',
      breadcrumb: [
        {
          text: 'Dashboards',
        },
        {
          text: 'Cost Calculation',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/parcel/preview/:id',
    name: 'ship2u-parcel-preview',
    component: () => import('@/views/ship2u/parcel/parcel-preview/ParcelPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Detail',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/parcel/edit/:id',
    name: 'ship2u-parcel-edit',
    component: () => import('@/views/ship2u/parcel/parcel-edit/ParcelEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Edit',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/incomplete_parcels',
    name: 'incomplete_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/IncompleteList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Incomplete Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Incomplete Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/waiting_parcels',
    name: 'waiting_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/WaitingList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Waiting for Delivery',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Waiting for Delivery',
          active: true,
        },
      ],
    },
  },
  {
    path: '/processing_parcels',
    name: 'processing_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/ProcessingList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Processing Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Processing Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/out_parcels',
    name: 'out_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/OutList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Outbound Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Outbound Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/order_list',
    name: 'order-list',
    component: () => import('@/views/ship2u/order/order-list/OrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Orders',
        },
        {
          text: 'All',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/order/preview/:id',
    name: 'ship2u-order-preview',
    component: () => import('@/views/ship2u/order/order-preview/OrderPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Order Detail',
      breadcrumb: [
        {
          text: 'Orders',
        },
        {
          text: 'Order Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/address/preview/:id/:isSender',
    name: 'ship2u-address-preview',
    component: () => import('@/views/ship2u/address/address-preview/AddressPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Address Detail',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Address Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/order/edit/:id',
    name: 'ship2u-order-edit',
    component: () => import('@/views/ship2u/order/order-edit/OrderEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Edit',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/address/edit/:id/:isSender',
    name: 'ship2u-address-edit',
    component: () => import('@/views/ship2u/address/address-edit/AddressEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Address Edit',
      breadcrumb: [
        {
          text: 'Addresses',
        },
        {
          text: 'Address Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/shipping_address_list',
    name: 'ship2u-shipping-address-list',
    component: () => import('@/views/ship2u/address/shipping-list/ShippingAddressList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Shipping Address List',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Shipping Address List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sender_address_list',
    name: 'ship2u-sender-address-list',
    component: () => import('@/views/ship2u/address/shipping-list/SenderAddressList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Sender Address List',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Sender Address List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/shipping_address_add',
    name: 'ship2u-shipping-address-add',
    component: () => import('@/views/ship2u/address/address-add/AddressAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Shipping Address',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Shipping Address',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sender_address_add',
    name: 'ship2u-sender-address-add',
    component: () => import('@/views/ship2u/address/address-add/AddressAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Sender Address',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Sender Address',
          active: true,
        },
      ],
    },
  },
  {
    path: '/order_add',
    name: 'ship2u-order-add',
    component: () => import('@/views/ship2u/order/order-add/OrderAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Order',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Order',
          active: true,
        },
      ],
    },
  },
]
