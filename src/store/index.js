import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import createPersistedState from 'vuex-persistedstate'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import ship2u from './ship2u'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
    ship2u,
  },
  strict: process.env.DEV,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
