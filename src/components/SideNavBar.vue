<template>
  <nav :class="[
    'h-full border-r rounded-none border-r-surface-container-high bg-[#1E293B] flex flex-col overflow-y-auto transition-all duration-300 ease-in-out shrink-0',
    isCollapsed ? 'w-[62px]' : 'w-[300px]'
  ]">
    <div class="p-4 border-b border-surface-container-high flex flex-col gap-2 min-h-[76px] justify-center">
      <div class="flex items-center gap-3" :class="isCollapsed ? 'justify-center' : ''">
        <button @click="isCollapsed = !isCollapsed" class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-2 rounded transition-colors flex shrink-0 items-center justify-center">
          <span class="material-symbols-outlined text-[20px]">menu</span>
        </button>
        <h1 v-show="!isCollapsed" class="text-emerald-500 font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden">Auction Manager</h1>
      </div>
      <div class="mt-2" v-show="!isCollapsed">
        <h2 class="font-headline-md text-headline-md text-on-surface whitespace-nowrap overflow-hidden">Auction Console</h2>
      </div>
    </div>

    <div class="flex-1 py-4 flex flex-col gap-1">
      <router-link to="/pre-auction" :class="[
        'flex items-center py-3 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold',
        route.path === '/pre-auction' ? 'bg-[#0F172A] text-emerald-400 border-l-4 border-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-l-4 border-transparent',
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      ]" :title="isCollapsed ? 'Pre-Auction' : ''">
        <span class="material-symbols-outlined shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'">calendar_today</span>
        <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Pre-Auction</span>
      </router-link>
      <router-link to="/" :class="[
        'flex items-center py-3 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold',
        route.path === '/' ? 'bg-[#0F172A] text-emerald-400 border-l-4 border-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-l-4 border-transparent',
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      ]" :title="isCollapsed ? 'Live Auction' : ''">
        <span class="material-symbols-outlined shrink-0" :class="[{'text-secondary animate-pulse': route.path === '/'}, isCollapsed ? 'mr-0' : 'mr-3']">gavel</span>
        <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Live Auction</span>
      </router-link>
      <router-link to="/post-auction" :class="[
        'flex items-center py-3 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold',
        route.path === '/post-auction' ? 'bg-[#0F172A] text-emerald-400 border-l-4 border-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-l-4 border-transparent',
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      ]" :title="isCollapsed ? 'Post-Auction' : ''">
        <span class="material-symbols-outlined shrink-0" :class="isCollapsed ? 'mr-0' : 'mr-3'">fact_check</span>
        <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Post-Auction</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(false)
</script>
