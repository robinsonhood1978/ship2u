import { computed } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import store from '@/store'

export default function ship2uConfig() {
  let apiHost = 'http://127.0.0.1:8098'
  if (process.env.NODE_ENV === 'development') {
    apiHost = 'http://127.0.0.1:8098'
  } else {
    apiHost = 'https://packns.wisdomin.com'
  }
  const apiPath = `${apiHost}/api`
  const apiToken = `${apiHost}/api-token-auth/`
  const apiProfile = `${apiPath}/packgo/profile/`

  // ------------------------------------------------
  // token
  // ------------------------------------------------
  const token = computed({
    get: () => store.state.ship2u.authToken,
    set: val => {
      store.commit('ship2u/setToken', val)
    },
  })

  const login = computed({
    get: () => store.state.ship2u.login,
    set: val => {
      store.commit('ship2u/setLogin', val)
    },
  })

  const profile = computed({
    get: () => store.state.ship2u.userProfile,
    set: val => {
      store.commit('ship2u/setUserProfile', val)
    },
  })

  return {
    token,
    login,
    profile,
    apiPath,
    apiProfile,
    apiToken,
  }
}
