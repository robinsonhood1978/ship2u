import axios from 'axios'
import ship2uConfig from '@/ship2u/config/ship2uConfig'
import useJwt from '@/auth/jwt/useJwt'

const {
  apiToken, login, token, profile,
} = ship2uConfig()

export async function getToken(username, password) {
  let mytoken
  const data = {
    username,
    password,
  }
  // console.log(123)
  if (!login.value) {
    await axios.post(apiToken, data).then(ret => {
      mytoken = ret.data.token
      token.value = mytoken
      login.value = true
      // console.log(mytoken)
    }).catch(error => {
      console.log(error)
      console.log(`${error.response.status}---${error.response.statusText}`)
    })
  } else {
    mytoken = token.value
    console.log('exist token')
  }

  return mytoken
}

export async function getProfile() {
  let user = ''
  if (!profile.value) {
    await useJwt.profile().then(ret => {
      user = ret.data
      user.ability = [
        {
          action: 'read',
          subject: 'Client',
        },
        {
          action: 'read',
          subject: 'Auth',
        },
        {
          action: 'read',
          subject: 'Analytics',
        },
      ]
      user.role = 'client'
      user.ability = [
        {
          action: 'manage',
          subject: 'all',
        },
      ]
      user.role = 'admin'
      user.fullName = user.customer.first_name + user.customer.last_name
      user.username = user.customer.username
      // eslint-disable-next-line global-require
      // user.avatar = require('@/assets/images/avatars/13-small.png')
      profile.value = user
    })
  } else {
    user = profile.value
    console.log('profile exist')
  }

  return user
}
