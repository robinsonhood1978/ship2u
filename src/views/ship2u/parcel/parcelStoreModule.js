import { getParcels, getParcel, editParcel } from '@/ship2u/utils/tools'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchParcels(ctx, queryParams) {
      return getParcels({ params: queryParams })
    },
    fetchParcel(ctx, { id }) {
      return getParcel({ id })
    },
    saveParcel(ctx, { obj, parcel }) {
      // console.log(parcel)
      return editParcel(obj, parcel)
    },
  },
}
