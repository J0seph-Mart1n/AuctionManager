<template>
  <nav class="fixed left-0 top-0 h-full w-[260px] border-r rounded-none border-r-surface-container-high bg-[#1E293B] flex flex-col overflow-y-auto">
    <div class="p-6 border-b border-surface-container-high flex flex-col gap-2">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary-container rounded flex items-center justify-center text-primary font-bold text-xl">A</div>
        <h1 class="text-emerald-500 font-bold text-lg tracking-tight">AuctionPro</h1>
      </div>
      <div class="mt-4">
        <h2 class="font-headline-md text-headline-md text-on-surface">Auction Console</h2>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="w-2 h-2 rounded-full bg-error"></span>
          <span class="font-label-caps text-label-caps text-error">Offline Mode Active</span>
        </div>
      </div>
    </div>

    <div class="flex-1 py-4 flex flex-col gap-1">
      <a href="#" class="text-slate-400 flex items-center px-4 py-3 hover:text-slate-200 hover:bg-slate-800 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold">
        <span class="material-symbols-outlined mr-3">calendar_today</span> Pre-Auction
      </a>
      <!-- Active State -->
      <a href="#" class="bg-[#0F172A] text-emerald-400 border-l-4 border-emerald-500 flex items-center px-4 py-3 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold">
        <span class="material-symbols-outlined mr-3 text-secondary animate-pulse">gavel</span> Live Auction
      </a>
      <a href="#" class="text-slate-400 flex items-center px-4 py-3 hover:text-slate-200 hover:bg-slate-800 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold">
        <span class="material-symbols-outlined mr-3">fact_check</span> Post-Auction
      </a>
    </div>

    <div class="mt-auto border-t border-surface-container-high py-4">
      <a href="#" class="text-slate-400 flex items-center px-4 py-3 hover:text-slate-200 hover:bg-slate-800 transition-all duration-200 ease-in-out font-inter text-[13px] font-semibold">
        <span class="material-symbols-outlined mr-3">terminal</span> System Config
      </a>
    </div>
  </nav>
</template>

<script setup>
// SideNavBar component — reusable across all screens
</script>
