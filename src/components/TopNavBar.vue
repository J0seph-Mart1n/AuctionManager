<template>
  <header class="bg-[#0F172A] text-emerald-500 dark:text-emerald-400 font-inter text-sm font-medium tracking-tight border-b border-slate-700 flex items-center justify-between px-6 h-14 w-full z-10 shrink-0">
    <div class="flex items-center gap-4">
      <slot name="left">
        <span class="text-lg font-black tracking-tighter text-slate-50 uppercase flex items-center">AuctionPro</span>
      </slot>
    </div>
    <div class="flex items-center gap-4">
      <slot name="right">
        <button aria-label="settings" class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors active:bg-slate-700 duration-75 p-2 rounded flex items-center justify-center">
          <span class="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </slot>
    </div>
  </header>
</template>

<script setup>
</script>
