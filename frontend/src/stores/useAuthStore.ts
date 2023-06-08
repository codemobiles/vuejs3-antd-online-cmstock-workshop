import { FetchingStatus } from '@/models/fetchingStatus'
import type { Session } from '@/models/session.model'
import type { User } from '@/models/user.model'
import api from '@/services/api'
import { server } from '@/services/constants'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const session = reactive<Session>({ isLoggedIn: false })
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init)

  async function login(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let result = await api.login(user)
      if (result == true) {
        session.username = user.username
        session.isLoggedIn = true
        fetchingStatus.value = FetchingStatus.success
      } else {
        session.isLoggedIn = false
        fetchingStatus.value = FetchingStatus.failed
      }
    } catch (e) {
      session.isLoggedIn = false
      fetchingStatus.value = FetchingStatus.failed
    }
  }

  async function register(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching
      await new Promise((resolve) => setTimeout(resolve, 1000))
      let result = await api.register(user)
      if (result == true) {
        fetchingStatus.value = FetchingStatus.success
      } else {
        fetchingStatus.value = FetchingStatus.failed
      }
    } catch (e) {
      fetchingStatus.value = FetchingStatus.failed
    }
  }

  function restoreSession() {
    const token = localStorage.getItem(server.TOKEN_KEY)
    const username = localStorage.getItem(server.USERNAME)
    if (token && username) {
      session.isLoggedIn = true
      session.username = username
    } else {
      session.isLoggedIn = false
    }
  }

  function logout() {
    localStorage.clear()
    session.isLoggedIn = undefined as any
    session.username = undefined
    router.push('/login')
  }

  return { session, fetchingStatus, login, register, restoreSession, logout }
})
