import mock from '@/@fake-db/mock'
import jwt from 'jsonwebtoken'
import { getToken, getProfile } from '@/ship2u/utils/tools'
import useJwt from '@/auth/jwt/useJwt'

const data = {
  users: [
    {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      password: 'admin',
      // eslint-disable-next-line global-require
      avatar: require('@/assets/images/avatars/13-small.png'),
      email: 'admin@demo.com',
      role: 'admin',
      ability: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
      extras: {
        eCommerceCartItemsCount: 5,
      },
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      username: 'janedoe',
      password: 'client',
      // eslint-disable-next-line global-require
      avatar: require('@/assets/images/avatars/1-small.png'),
      email: 'client@demo.com',
      role: 'client',
      ability: [
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
      ],
      extras: {
        eCommerceCartItemsCount: 5,
      },
    },
  ],
}

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '10m',
  refreshTokenExpireTime: '10m',
}

mock.onPost('/jwt/login').reply(async request => {
  const { email, password } = JSON.parse(request.data)
  // console.log(email)
  // console.log(password)

  let error = {
    email: ['Something went wrong'],
  }
  // console.log(process.env.NODE_ENV)
  let accessToken
  let user
  await getToken(email, password).then(async res => {
    accessToken = res
    // console.log('login')
    // getProfile().then(() => {
    //   console.log('profile')
    // })
    useJwt.setToken(accessToken)
    user = await getProfile()
  })
  // console.log(accessToken)
  // getToken('robinluo', 'paulbob123').then(() => console.log('login2'))
  // const user = data.users.find(u => u.email === email && u.password === password)
  console.log(user)
  if (user) {
    try {
      const userData = { ...user }

      // delete userData.password

      const response = {
        userData,
        accessToken,
      }

      return [200, response]
    } catch (e) {
      error = e
    }
  } else {
    error = {
      email: ['Email or Password is Invalid'],
    }
  }

  return [400, { error }]
})

mock.onPost('/jwt/register').reply(request => {
  const { username, email, password } = JSON.parse(request.data)

  // If not any of data is missing return 400
  if (!(username && email && password)) return [400]

  const isEmailAlreadyInUse = data.users.find(user => user.email === email)
  const isUsernameAlreadyInUse = data.users.find(user => user.username === username)

  const error = {
    password: !password ? ['Please enter password'] : null,
    email: (() => {
      if (!email) return ['Please enter your email.']
      if (isEmailAlreadyInUse) return ['This email is already in use.']
      return null
    })(),
    username: (() => {
      if (!username) return ['Please enter your username.']
      if (isUsernameAlreadyInUse) return ['This username is already in use.']
      return null
    })(),
  }

  if (!error.username && !error.email) {
    const userData = {
      email,
      password,
      username,
      fullName: '',
      avatar: null,
      role: 'admin',
      ability: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
    }

    // Add user id
    const { length } = data.users
    let lastIndex = 0
    if (length) {
      lastIndex = data.users[length - 1].id
    }
    userData.id = lastIndex + 1

    data.users.push(userData)

    const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    const user = { ...userData }
    delete user.password
    const response = {
      userData: user,
      accessToken,
    }

    return [200, response]
  }
  return [400, { error }]
})

mock.onPost('/jwt/refresh-token').reply(request => {
  const { refreshToken } = JSON.parse(request.data)

  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const userData = { ...data.users.find(user => user.id === id) }

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
    const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpireTime,
    })

    delete userData.password
    const response = {
      userData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    return [200, response]
  } catch (e) {
    const error = 'Invalid refresh token'
    return [401, { error }]
  }
})
