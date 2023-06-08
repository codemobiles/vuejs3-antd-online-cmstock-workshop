import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue'

import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true
})

const app = createApp(App)
app.use(createPinia())
app.use(Antd)
app.use(router)
app.config.globalProperties.$axios = { ...axiosInstance }
app.mount('#app')
