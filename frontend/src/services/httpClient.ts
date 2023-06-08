import axios from 'axios'
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE
} from '@/services/constants'
import router from '@/router'
import join from 'url-join'

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url!)) {
    config.url = join(apiUrl, config.url!)
  }

  const userToken = localStorage.getItem(server.TOKEN_KEY)
  if (userToken) {
    // @ts-ignore
    config.headers = { Authorization: `Bearer ${userToken}` }
  }
  config.timeout = 10000 // 10 Second
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(JSON.stringify(error, undefined, 2))
    // store.dispatch("doLogout");
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE
      })
    }
    return Promise.reject(error)
  }
)

export default axios
