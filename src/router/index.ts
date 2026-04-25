import { createRouter, createWebHistory } from 'vue-router'

import LiveAuctionView from '@/views/LiveAuctionView.vue'
import PreAuctionView from '@/views/PreAuctionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'live-auction',
      component: LiveAuctionView
    },
    {
      path: '/pre-auction',
      name: 'pre-auction',
      component: PreAuctionView
    },

  ],
})

export default router
