import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Report from '@/views/Report.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import Stock from '@/views/Stock.vue'
import StockCreate from '@/views/StockCreate.vue'
import StockEdit from '@/views/StockEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/stock',
      name: 'stock',
      component: Stock,
      meta: { isSecured: true }
    },
    {
      path: '/stock-create',
      name: 'stock-create',
      component: StockCreate,
      meta: { isSecured: true }
    },
    {
      path: '/stock-edit/:id',
      name: 'stock-edit',
      component: StockEdit,
      meta: { isSecured: true }
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
      meta: { isSecured: true }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login' //page not found
    }
  ]
})

// Router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => (record.meta.isSecured ? true : false))) {
    // secure route
    if (authStore.session.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    // unsecure route
    if (authStore.session.isLoggedIn) {
      router.push('/stock')
    } else {
      next()
    }
  }
})

export default router
