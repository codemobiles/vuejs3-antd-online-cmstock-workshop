import type { User } from '@/models/user.model'
import httpClient from '@/services/httpClient'
import { server } from '@/services/constants'
import router from '@/router'
const login = async (values: User) => {
  let result = await httpClient.post(server.LOGIN_URL, values)
  if (result.data.result == 'ok') {
    localStorage.setItem(server.USERNAME, values.username)
    localStorage.setItem(server.TOKEN_KEY, result.data.token)
    router.push('/stock')
    return true
  }
  // alert('Login Failed')
  return false
}

const register = async (values: User) => {
  let result = await httpClient.post(server.REGISTER_URL, values)
  if (result.data.result == 'ok') {
    router.push('/login')
    return true
  }
  return false
}

export default {
  login,
  register
}
