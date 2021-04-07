export default [
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    tag: '2',
    tagVariant: 'light-warning',
    action: 'read',
    resource: 'Client',
    children: [
      {
        title: 'Home',
        route: 'home',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Cost Calculation',
        route: 'cost',
        action: 'read',
        resource: 'Client',
      },
    ],
  },
  {
    title: 'Account',
    icon: 'UserIcon',
    tagVariant: 'light-warning',
    action: 'read',
    resource: 'Client',
    children: [
      {
        title: 'Personal',
        route: 'ship2u-personal',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Shipping Address',
        route: 'ship2u-shipping-address-list',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Sender Address',
        route: 'ship2u-sender-address-list',
        action: 'read',
        resource: 'Client',
      },
    ],
  },
  {
    title: 'Parcels',
    icon: 'ArchiveIcon',
    tag: '3',
    tagVariant: 'light-warning',
    action: 'read',
    resource: 'Client',
    children: [
      {
        title: 'Incomplete',
        route: 'incomplete_parcels',
        tag: '4',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Waiting',
        route: 'waiting_parcels',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Processing',
        route: 'processing_parcels',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'Outbound',
        route: 'out_parcels',
        action: 'read',
        resource: 'Client',
      },
    ],
  },
  {
    title: 'Orders',
    icon: 'CheckSquareIcon',
    tag: '3',
    tagVariant: 'light-warning',
    action: 'read',
    resource: 'Client',
    children: [
      {
        title: 'Create',
        route: 'ship2u-order-add',
        action: 'read',
        resource: 'Client',
      },
      {
        title: 'All',
        route: 'order-list',
        action: 'read',
        resource: 'Client',
      },
    ],
  },
]
