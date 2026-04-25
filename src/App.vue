<template>
  <div class="bg-background text-on-background font-body-base overflow-hidden flex h-screen dark">
    <SideNavBar />

    <!-- Main Content Area -->
    <div class="ml-[260px] flex-1 flex flex-col h-full bg-background relative">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SideNavBar from './components/SideNavBar.vue'
</script>

<style scoped>
/* Any additional specific component scoping can go here. Tailwind handles 99% of styles. */
</style>