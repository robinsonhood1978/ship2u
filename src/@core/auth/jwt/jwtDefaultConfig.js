let apiHost = 'http://127.0.0.1:8098'
if (process.env.NODE_ENV === 'development') {
  apiHost = 'http://127.0.0.1:8098'
} else {
  apiHost = 'https://packns.wisdomin.com'
}
const apiPath = `${apiHost}/api`
const apiToken = `${apiHost}/api-token-auth/`
const apiProfile = `${apiPath}/packgo/profile/`
const apiPackage = `${apiPath}/parcels/`
const apiOrder = `${apiPath}/freightorders/`
const apiShippingAddress = `${apiPath}/freightcustomers/addresses/?is_sender=false`
const apiSenderAddress = `${apiPath}/freightcustomers/addresses/?is_sender=true`
const apiEditParcelEndpoint = `${apiPackage}edit_parcel/`

export default {
  // Endpoints
  tokenEndpoint: apiToken,
  loginEndpoint: '/jwt/login',
  profileEndpoint: apiProfile,
  ordersEndpoint: apiOrder,
  shippingAddressesEndpoint: apiShippingAddress,
  senderAddressesEndpoint: apiSenderAddress,
  parcelsEndpoint: apiPackage,
  editParcelEndpoint: apiEditParcelEndpoint,
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'JWT',
  appId: 'ship2u-website',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
