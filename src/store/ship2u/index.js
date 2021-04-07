import { paginateArray, sortCompare } from '@/@fake-db/utils'
import useJwt from '@/auth/jwt/useJwt'
import qs from 'qs'
import axios from 'axios'

let apiHost = 'http://127.0.0.1:8098'
if (process.env.NODE_ENV === 'development') {
  apiHost = 'http://127.0.0.1:8098'
} else {
  apiHost = 'https://packns.wisdomin.com'
}
const apiPath = `${apiHost}/api`
const apiProfile = `${apiPath}/packgo/profile/`
const apiAddress = `${apiPath}/freightcustomers/addresses/`
const apiVerifyAddress = `${apiPath}/freightcustomers/verify_address/`
const apiRegister = `${apiPath}/freightcustomers/register_ship2u/`
const apiGetAddress = `${apiPath}/freightcustomers/get_address/`
const apiPackage = `${apiPath}/parcels/`
const apiEditParcelEndpoint = `${apiPackage}edit_parcel/`
const apiQuote = `${apiPath}/freightorders/quote/`
const apiOrder = `${apiPath}/freightorders/`

const d = {
  login: false,
  authToken: '',
  userProfile: null,
  orders: null,
  parcels: null,
  addresses: null,
  shippingAddresses: null,
  senderAddresses: null,
  parcelsArr: [],
  ordersArr: [],
  quote: null,
}

export default {
  namespaced: true,
  state: d,
  getters: {
    parcelsMap: state => {
      const map = new Map(state.parcelsArr)
      return map
    },
    shippingAddressMap: state => {
      // eslint-disable-next-line prefer-const
      let arr = []
      state.shippingAddresses.forEach(i => {
        arr.push([i.id, i])
      })
      console.log(arr)
      const map = new Map(arr)
      return map
    },
    senderAddressMap: state => {
      // eslint-disable-next-line prefer-const
      let arr = []
      state.senderAddresses.forEach(i => {
        arr.push([i.id, i])
      })
      console.log(arr)
      const map = new Map(arr)
      return map
    },
    ordersMap: state => {
      const arr = state.ordersArr
      const map = new Map(arr)
      return map
    },
    headers: state => {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    headers_post_notoken: () => {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return headers
    },
    headers_json: state => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    get_headers: state => {
      const headers = {
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    // shippingAddresses: state => state.addresses.filter(i => !i.is_sender),
    // senderAddresses: state => state.addresses.filter(i => i.is_sender),
  },
  mutations: {
    setLogin(state, val) {
      state.login = val
    },
    setToken(state, val) {
      state.authToken = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setOrders(state, val) {
      state.orders = val
    },
    setAddresses(state, val) {
      state.addresses = val
    },
    setShippingAddresses(state, val) {
      state.shippingAddresses = val
    },
    setSenderAddresses(state, val) {
      state.senderAddresses = val
    },
    setSenderAddressesMap(state, map) {
      // eslint-disable-next-line prefer-const
      let arr = []
      map.forEach(value => {
        arr.push(value)
      })
      state.senderAddresses = arr
    },
    setShippingAddressesMap(state, map) {
      // eslint-disable-next-line prefer-const
      let arr = []
      map.forEach(value => {
        arr.push(value)
      })
      state.shippingAddresses = arr
    },
    setParcels(state, val) {
      state.parcels = val
    },
    setParcelsArr(state, val) {
      state.parcelsArr = val
    },
    setOrdersArr(state, val) {
      state.ordersArr = val
    },
    setOrdersMap(state, val) {
      const arr = Array.from(val)
      state.ordersArr = arr
    },
    setParcelsMap(state, val) {
      const arr = Array.from(val)
      state.parcelsArr = arr
    },
    setQuote(state, val) {
      state.quote = val
    },
  },
  actions: {
    async register({ getters }, queryObj) {
      let code = 0
      let msg = ''
      // const { obj } = queryObj
      try {
        await axios.post(apiRegister, qs.stringify(queryObj), {
          headers: getters.headers_post_notoken,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('register ok')
            msg = 'register ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async getProfile({ getters, commit }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(apiProfile, {
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = 'get profile ok'
          code = 0
          obj = resp.data
          // console.log(resp)
          commit('setUserProfile', obj)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async updateProfile({ dispatch, getters }, queryObj) {
      let code = 0
      let msg = 'Success'
      try {
        await axios.post(apiProfile, qs.stringify(queryObj), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            // console.log(resp)
            code = 1
          } else {
            // console.log(resp)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
          msg = error.response.statusText
        })
      } catch (e) {
        console.log(e)
        code = 3
        msg = e
      }
      await dispatch('getProfile')
      return { code, msg }
    },
    async newOrder({
      commit, getters, dispatch,
    }, queryObj) {
      const { order } = queryObj
      let data = null
      let boo = false
      try {
        await axios.post(apiOrder, order, {
          headers: getters.headers_json,
        }).then(resp => {
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            data = resp.data.object
            boo = true
            // console.log(resp.data.object)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      // if (state.ordersArr.length === 0) {
      await dispatch('orders', {})
      // }
      if (data) {
        const { id } = data
        // eslint-disable-next-line prefer-const
        let map = getters.ordersMap
        console.log(map)
        if (map.has(id)) {
          data = map.get(id)
          console.log('order exist')
        } else {
          map.set(id, data)
          commit('setOrdersMap', map)
        }
        // 删除parcelArr中对应id
        // let pmap = getters.parcelsMap
        // pmap.set(id, parcel)
        // commit('setParcelsMap', map)
      }

      return boo
    },
    async quote({ commit, getters }, queryObj) {
      const { order } = queryObj
      let data
      try {
        await axios.post(apiQuote, order, {
          headers: getters.headers_json,
        }).then(resp => {
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            data = resp.data.object
            commit('setQuote', resp.data.object)
            // console.log(resp.data.object)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      return data
    },
    async defaultShippingAddress({ state, dispatch }) {
      let dsa = null
      if (state.shippingAddresses === null) {
        await dispatch('shippingAddresses', {})
      } else {
        // console.log('state shippingAddresses not null')
      }
      const arr = state.shippingAddresses
      // console.log(arr.length)
      const darr = arr.filter(a => a.default)
      if (darr.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        dsa = darr[0]
      }
      if (arr.length > 0 && darr.length === 0) {
        // eslint-disable-next-line prefer-destructuring
        dsa = arr[0]
      }
      return dsa
    },
    async defaultSenderAddress({ state, dispatch }) {
      let dsa = null
      if (state.senderAddresses === null) {
        await dispatch('senderAddresses', {})
      } else {
        // console.log('state senderAddresses not null')
      }
      const arr = state.senderAddresses
      // console.log(arr.length)
      const darr = arr.filter(a => a.default)
      if (darr.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        dsa = darr[0]
      }
      if (arr.length > 0 && darr.length === 0) {
        // eslint-disable-next-line prefer-destructuring
        dsa = arr[0]
      }
      return dsa
    },
    async refreshParcels({ commit }, queryParams) {
      let data = ''
      await useJwt.parcels({ params: queryParams }).then(ret => {
        data = ret.data
        commit('setParcels', data)
      })
      return data
    },
    async parcels({ state, commit }, queryParams) {
      let data = ''
      if (!state.parcels || queryParams.forceRefresh) {
        await useJwt.parcels({ params: queryParams }).then(ret => {
          data = ret.data
          commit('setParcels', data)
          console.log('get new parcels from server')
        })
      } else {
        data = state.parcels
        // console.log('parcels exist')
        // console.log(data)
      }
      return data
    },
    async fetchParcels({ dispatch }, queryParams) {
      const data = await dispatch('parcels', queryParams)
      console.log(queryParams)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false, status = null } = queryParams
      /* eslint-enable */

      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        parcel =>
        /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (parcel.title.toLowerCase().includes(queryLowered) ||
        parcel.local_courier_number.toLowerCase().includes(queryLowered)) &&
      parcel.freight_type === (status || parcel.freight_type),
      )
      /* eslint-enable  */

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      // console.log(sortedData)
      return {
        parcels: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    async fetchParcel({ getters, commit }, { id }) {
      let data = ''
      // console.log(parcelsMap.value)
      const map = getters.parcelsMap
      if (map.has(id)) {
        data = map.get(id)
        console.log('parcel exist')
        console.log(data)
      } else {
        await useJwt.parcel({ id }).then(ret => {
          data = ret.data
          map.set(id, data)
          commit('setParcelsMap', map)
          console.log('axios get parcel by id')
        })
      }
      return data
    },
    async saveParcel({ getters, commit }, { obj, parcel }) {
      let data = ''
      const { id } = obj
      // console.log(headers)
      // console.log(token.value)
      await axios.post(apiEditParcelEndpoint, qs.stringify(obj), {
        headers: getters.headers,
      }).then(ret => {
        data = ret.data
        const map = getters.parcelsMap
        console.log(`reset parcel${id}`)
        // console.log(parcel)
        map.set(id, parcel)
        commit('setParcelsMap', map)
        // console.log(data)
      }).catch(error => {
        console.log(error)
        console.log(`${error.response.status}---${error.response.statusText}`)
      })
      return data
    },
    async delAddress({ state, commit, getters }, queryObj) {
      let code = 1
      let msg = ''
      const { isSender, id } = queryObj
      const data = {
        id,
      }
      const resp = await axios.delete(apiAddress, {
        headers: getters.headers,
        data: qs.stringify(data),
      })
      console.log(resp)
      if (resp.data.code !== 0) {
        code = 1
      } else {
        console.log('Delete address ok')
        code = 0
        msg = 'Delete address ok'
        if (!isSender) {
          let arr = state.shippingAddresses
          arr = arr.filter(a => a.id !== id)
          commit('setShippingAddresses', arr)
        } else {
          let arr = state.senderAddresses
          arr = arr.filter(a => a.id !== id)
          commit('setSenderAddresses', arr)
        }
      }
      return { code, msg }
    },
    async getAddress({ getters }, queryObj) {
      let code = 0
      let msg = ''
      const { id } = queryObj
      try {
        await axios.get(apiGetAddress, {
          params: {
            aid: id,
          },
          headers: getters.get_headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('get address ok')
            msg = 'get address ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async verifyAddress({ getters }, queryObj) {
      let code = 0
      let msg = ''
      const { obj } = queryObj
      try {
        await axios.post(apiVerifyAddress, qs.stringify(obj), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('verify address ok')
            msg = 'verify address ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async updateAddress({ getters, commit }, queryObj) {
      let code = 1
      let msg = ''
      const { obj, isSender } = queryObj
      try {
        const resp = await axios.post(apiAddress, qs.stringify(obj), {
          headers: getters.headers,
        })
        if (resp.data.code !== 0) {
          code = 1
        } else {
          console.log(resp)
          const { object } = resp.data
          console.log('update address ok')
          code = 0
          msg = 'update address ok'
          if (!isSender) {
            const map = getters.shippingAddressMap
            map.set(obj.id, object)
            commit('setShippingAddressesMap', map)
          } else {
            const map = getters.senderAddressMap
            map.set(obj.id, object)
            commit('setSenderAddressesMap', map)
          }
        }
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async saveAddress({ state, getters, commit }, queryObj) {
      let code = 1
      let msg = ''
      const { obj, isSender } = queryObj
      try {
        const resp = await axios.post(apiAddress, qs.stringify(obj), {
          headers: getters.headers,
        })
        if (resp.data.code !== 0) {
          code = 1
        } else {
          console.log(resp)
          const { object } = resp.data
          console.log('save address ok')
          code = 0
          msg = 'save address ok'
          if (!isSender) {
            // await dispatch('shippingAddresses', queryObj)
            let arr = []
            arr = state.shippingAddresses
            arr.push(object)
            commit('setShippingAddresses', arr)
          } else {
            let arr = []
            arr = state.senderAddresses
            arr.push(object)
            commit('setSenderAddresses', arr)
          }
        }
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async addAddress({ dispatch }, queryObj) {
      const { obj, isSender } = queryObj
      let status = { code: 1, msg: '' }
      if (!isSender) {
        status = await dispatch('verifyAddress', { obj })
      } else {
        status.code = 0
      }
      let { code, msg } = status
      console.log(code)
      if (code === 0) {
        await dispatch('saveAddress', queryObj).then(resp => {
          if (resp.code !== 0) {
            console.log(resp)
            code = 1
          } else {
            console.log('add address ok')
            code = 0
            msg = 'save address ok'
          }
        })
      } else {
        console.log(status)
      }
      return { code, msg }
    },
    async uptAddress({ dispatch }, queryObj) {
      const { obj, isSender } = queryObj
      let status = { code: 1, msg: '' }
      if (!isSender) {
        status = await dispatch('verifyAddress', { obj })
      } else {
        status.code = 0
      }
      let { code, msg } = status
      console.log(code)
      if (code === 0) {
        await dispatch('updateAddress', queryObj).then(resp => {
          if (resp.code !== 0) {
            console.log(resp)
            code = 1
          } else {
            console.log('update address ok')
            code = 0
            msg = 'update address ok'
          }
        })
      } else {
        console.log(status)
      }
      return { code, msg }
    },
    async updateDefaultAddress({ commit, state, getters }, queryObj) {
      const { isSender = false, addrId } = queryObj
      let data
      if (isSender) {
        data = {
          shipper_address_id: addrId,
        }
      } else {
        data = {
          address_id: addrId,
        }
      }
      try {
        await axios.post(apiProfile, qs.stringify(data), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            console.log(resp)
            // eslint-disable-next-line prefer-const
            let userprofile = state.userProfile
            if (isSender) {
              userprofile.customer.shipper_address = addrId
            } else {
              userprofile.customer.address = addrId
            }
            commit('setUserProfile', userprofile)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async fetchSenderAddresses({ dispatch, state }, queryObj) {
      let data = ''
      if (!state.senderAddresses) {
        data = await dispatch('senderAddresses', queryObj)
      } else {
        data = state.senderAddresses
      }
      console.log(data)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false } = queryObj
      /* eslint-enable */
      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        add =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (add.title.toLowerCase().includes(queryLowered) ||
            add.address.toLowerCase().includes(queryLowered) ||
            add.suburb.toLowerCase().includes(queryLowered) ||
            add.city.toLowerCase().includes(queryLowered)),
      )
      /* eslint-enable  */

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      return {
        addresses: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    async senderAddresses({ commit, state }, queryObj) {
      let data = null
      await useJwt.senderAddresses(queryObj).then(ret => {
        data = ret.data.object
        data.forEach(i => {
          // eslint-disable-next-line no-param-reassign
          i.default = (i.id === state.userProfile.customer.shipper_address) ? i.id : false
        })
        commit('setSenderAddresses', data)
        console.log('axios get sender addresses')
      })
      return data
    },
    async shippingAddresses({ commit, state }, queryObj) {
      let data = null
      await useJwt.shippingAddresses(queryObj).then(ret => {
        data = ret.data.object
        data.forEach(i => {
          // eslint-disable-next-line no-param-reassign
          i.default = (i.id === state.userProfile.customer.address) ? i.id : false
        })
        commit('setShippingAddresses', data)
        console.log('axios get addresses')
      })
      return data
    },
    async fetchShipperAddress({ getters }, { id }) {
      let data = ''
      const map = getters.senderAddressMap
      console.log(map)
      const aid = Number(id)
      console.log(aid)
      if (map.has(aid)) {
        data = map.get(aid)
        console.log('shipper exist')
        // console.log(data)
      } else {
        // data = await dispatch('getAddress', { id })
        // console.log(data)
        // map.set(id, data)
        // commit('setShippingAddressesMap', map)
        console.log('axios get address by id')
      }

      return data
    },
    async fetchSenderAddress({ getters }, { id }) {
      let data = ''
      const map = getters.senderAddressMap
      console.log(map)
      const aid = Number(id)
      console.log(aid)
      if (map.has(aid)) {
        data = map.get(aid)
        console.log('sender exist')
      } else {
        // data = await dispatch('getAddress', { id })
        // console.log(data)
        // map.set(id, data)
        // commit('setSenderAddressesMap', map)
        // eslint-disable-next-line radix
        console.log('axios get address by id')
      }
      console.log(data)
      return data
    },
    async fetchAddress({ dispatch }, { id, isSender }) {
      let data = ''
      console.log(isSender)
      if (isSender === true) {
        data = await dispatch('fetchSenderAddress', { id })
      } else {
        data = await dispatch('fetchShipperAddress', { id })
      }
      console.log(data)
      return data
    },
    async fetchShippingAddresses({ state, dispatch }, queryObj) {
      let data = ''
      if (!state.shippingAddresses) {
        data = await dispatch('shippingAddresses', queryObj)
      } else {
        data = state.shippingAddresses
        console.log('addresses exist')
      }
      console.log(data)
      console.log(state.userProfile.customer.address)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false } = queryObj
      /* eslint-enable */
      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        add =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (add.title.toLowerCase().includes(queryLowered) ||
            add.address.toLowerCase().includes(queryLowered) ||
            add.suburb.toLowerCase().includes(queryLowered) ||
            add.city.toLowerCase().includes(queryLowered)),
      )
      /* eslint-enable  */

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      return {
        addresses: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    async fetchOrder({ commit, getters }, { id }) {
      let data = ''
      // console.log(parcelsMap.value)
      // const arr = getters.ordersArr
      const map = getters.ordersMap
      console.log(map)
      if (map.has(id)) {
        data = map.get(id)
        console.log('order exist')
        // console.log(data)
      } else {
        await useJwt.order({ id }).then(ret => {
          data = ret.data
          map.set(id, data)
          // ordersMap.value = map
          // const newarr = Array.from(map)
          // console.log(arr)
          commit('setOrdersMap', map)
          console.log('axios get order by id')
        })
      }

      return data
    },
    async orders({ commit, state }, queryObj) {
      let data = ''
      if (!state.orders) {
        await useJwt.orders(queryObj).then(ret => {
          data = ret.data
          data.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.ifpaid = (i.paid) ? 'Paid' : 'Unpaid'
          })
          commit('setOrders', data)
          console.log('axios get orders')
        })
      } else {
        data = state.orders
        console.log('orders exist')
      }
      return data
    },
    async fetchOrders({ commit, state }, queryObj) {
      let data = ''
      if (!state.orders) {
        await useJwt.orders(queryObj).then(ret => {
          data = ret.data
          data.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.ifpaid = (i.paid) ? 'Paid' : 'Unpaid'
          })
          // orders.value = data
          commit('setOrders', data)
          console.log('axios get orders')
          // console.log(data)
        })
      } else {
        data = state.orders
        console.log('orders exist')
        // console.log(data)
      }
      // console.log(data)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false, status = null } = queryObj
      /* eslint-enable */
      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        order =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (order.title.toLowerCase().includes(queryLowered) ||
            order.tracking_number.toLowerCase().includes(queryLowered)) &&
          order.freight_type === (status || order.freight_type),
      )
      /* eslint-enable  */

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      return {
        orders: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
  },
}
