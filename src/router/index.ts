import { createRouter, createWebHistory } from 'vue-router'

import LiveAuctionView from '@/views/LiveAuctionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'live-auction',
      component: LiveAuctionView
    }
  ],
})

export default router
