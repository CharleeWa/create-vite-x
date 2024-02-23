import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
})

router.beforeEach((_to, _from, next) => {
  next()
})

export default router
