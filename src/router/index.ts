import { createRouter, createWebHistory } from 'vue-router'

import LiveAuctionView from '@/views/LiveAuctionView.vue'
import PreAuctionView from '@/views/PreAuctionView.vue'
import PostAuctionView from '@/views/PostAuctionView.vue'

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
    {
      path: '/post-auction',
      name: 'post-auction',
      component: PostAuctionView
    }
  ],
})

export default router
