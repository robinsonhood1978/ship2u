import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // this.axiosIns.defaults.headers.common['appid'] = `${this.jwtConfig.appId}`
    // this.axiosIns.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded'

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from sessionStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        // eslint-disable-next-line no-param-reassign
        // config.headers.commnon['content-type'] = 'application/x-www-form-urlencoded'
        // config.headers.commnon['appid'] = `${this.jwtConfig.appId}`
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // Update accessToken in sessionStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return sessionStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return sessionStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  token(...args) {
    return this.axiosIns.post(this.jwtConfig.tokenEndpoint, ...args)
  }

  // 登录
  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  // 获取用户信息
  profile(...args) {
    return this.axiosIns.get(this.jwtConfig.profileEndpoint, ...args)
  }

  // 获取运单列表
  orders(...args) {
    return this.axiosIns.get(this.jwtConfig.ordersEndpoint, ...args)
  }

  // 获取收件地址列表
  shippingAddresses(...args) {
    return this.axiosIns.get(this.jwtConfig.shippingAddressesEndpoint, ...args)
  }

  // 获取发件地址列表
  senderAddresses(...args) {
    return this.axiosIns.get(this.jwtConfig.senderAddressesEndpoint, ...args)
  }

  // 获取包裹列表
  parcels(...args) {
    return this.axiosIns.get(this.jwtConfig.parcelsEndpoint, ...args)
  }

  // 获取包裹
  parcel({ id }) {
    return this.axiosIns.get(`${this.jwtConfig.parcelsEndpoint + id}/`)
  }

  // 获取运单详情
  order({ id }) {
    return this.axiosIns.get(`${this.jwtConfig.ordersEndpoint + id}/`)
  }

  // 编辑包裹
  editParcel(...args) {
    // this.axiosIns.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded'
    this.axiosIns.interceptors.request.use(
      config => {
        // eslint-disable-next-line no-param-reassign
        config.headers.commnon['content-type'] = 'application/x-www-form-urlencoded'
        return config
      },
      error => Promise.reject(error),
    )
    return this.axiosIns.post(this.jwtConfig.editParcelEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }
}
