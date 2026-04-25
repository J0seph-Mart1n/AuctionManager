<template>
  <!-- TopNavBar -->
  <header class="flex items-center justify-between px-6 h-14 w-full docked full-width top border-b border-b-slate-700 bg-[#0F172A] flat no shadows z-10">
    <div class="flex items-center">
      <span class="font-inter text-sm font-medium tracking-tight text-emerald-500 dark:text-emerald-400">Live Execution Console</span>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 border-r border-slate-700 pr-4">
        <button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors p-2 rounded flex items-center gap-2 font-inter text-[13px] font-semibold">
          Backup [F10]
        </button>
        <button class="bg-primary-container text-on-primary-container px-3 py-1.5 rounded text-[13px] font-bold border border-outline-variant hover:bg-slate-800 transition-colors">
          Clerk
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded transition-colors active:bg-slate-700 duration-75">
          <span class="material-symbols-outlined text-[20px]">wifi_off</span>
        </button>
        <button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded transition-colors active:bg-slate-700 duration-75">
          <span class="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Canvas -->
  <main class="flex-1 overflow-hidden flex p-6 gap-6">
    <!-- Left Column: Input Forms -->
    <div class="flex-[2] flex flex-col gap-6">
      
      <!-- Lot & Bidder Entry Block -->
      <div class="bg-surface-container rounded-xl border border-surface-container-highest p-8 flex flex-col gap-8 shadow-sm">
        <div class="grid grid-cols-2 gap-8">
          
          <!-- Lot Input -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
              LOT NUMBER <span class="text-outline">ALT+L</span>
            </label>
            <div class="relative">
              <input v-model="form.lot" type="text" placeholder="---" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-lot-id-display text-lot-id-display rounded-lg p-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-center placeholder-surface-bright" />
            </div>
            <!-- Live Validation Card -->
            <div v-if="form.lot" class="mt-2 bg-primary-container border border-outline-variant rounded p-3 flex flex-col gap-1">
              <div class="flex justify-between items-center">
                <span class="font-body-base text-body-base text-on-surface">1967 Ford Mustang Shelby GT500</span>
                <span class="bg-secondary-container text-on-secondary px-2 py-0.5 rounded font-label-caps text-label-caps text-[10px]">VERIFIED</span>
              </div>
              <div class="flex justify-between items-center mt-1 pt-1 border-t border-surface-variant">
                <span class="font-label-caps text-label-caps text-on-surface-variant">Reserve</span>
                <span class="font-data-tabular text-data-tabular text-outline">$85,000</span>
              </div>
            </div>
          </div>

          <!-- Bidder Input -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
              BIDDER ID <span class="text-outline">ALT+B</span>
            </label>
            <div class="relative">
              <input v-model="form.bidder" type="text" placeholder="---" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-lot-id-display text-lot-id-display rounded-lg p-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-center placeholder-surface-bright" />
            </div>
            <!-- Live Validation Card -->
            <div v-if="form.bidder" class="mt-2 bg-primary-container border border-outline-variant rounded p-3 flex flex-col gap-1">
              <div class="flex justify-between items-center">
                <span class="font-body-base text-body-base text-on-surface">J. Reynolds (VIP)</span>
                <span class="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-label-caps text-label-caps text-[10px]">VERIFIED</span>
              </div>
              <div class="flex justify-between items-center mt-1 pt-1 border-t border-surface-variant">
                <span class="font-label-caps text-label-caps text-on-surface-variant">Credit Limit</span>
                <span class="font-data-tabular text-data-tabular text-secondary">$500,000</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Winning Amount -->
        <div class="flex flex-col gap-2 border-t border-surface-container-highest pt-8">
          <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
            WINNING AMOUNT <span class="text-outline">ALT+A</span>
          </label>
          <div class="relative">
            <span class="absolute left-6 top-1/2 -translate-y-1/2 font-bid-amount-lg text-bid-amount-lg text-outline">$</span>
            <input v-model="form.amount" type="text" placeholder="0" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-bid-amount-lg text-bid-amount-lg rounded-lg py-6 pl-16 pr-6 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary tracking-wider" />
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="grid grid-cols-4 gap-4 mt-auto">
        <button @click="recordSale" class="col-span-2 bg-secondary text-on-secondary font-headline-md text-headline-md rounded-lg py-5 flex items-center justify-center gap-3 hover:bg-secondary-fixed transition-colors border border-transparent focus:ring-4 focus:ring-secondary focus:ring-opacity-50">
          <span class="material-symbols-outlined font-bold text-2xl" style="font-variation-settings: 'FILL' 1;">gavel</span>
          RECORD SALE
          <span class="font-label-caps text-label-caps opacity-60 ml-2 border border-on-secondary border-opacity-30 px-2 py-1 rounded bg-black/10">[ENTER]</span>
        </button>
        <button @click="passSale" class="bg-error-container text-error font-body-base text-body-base rounded-lg py-5 flex items-center justify-center gap-2 border border-error border-opacity-30 hover:bg-error/20 transition-colors">
          <span class="material-symbols-outlined text-[20px]">close</span>
          Pass / No Sale
          <span class="font-label-caps text-label-caps opacity-60 block mt-1 ml-1">[F4]</span>
        </button>
        <button @click="undoLast" class="bg-surface-container text-on-surface font-body-base text-body-base rounded-lg py-5 flex items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container-highest transition-colors">
          <span class="material-symbols-outlined text-[20px]">undo</span>
          Undo Last
          <span class="font-label-caps text-label-caps opacity-60 block mt-1 ml-1">[CTRL+Z]</span>
        </button>
      </div>
    </div>

    <!-- Right Column: Verification Log -->
    <div class="flex-1 flex flex-col bg-surface-container rounded-xl border border-surface-container-highest overflow-hidden">
      <div class="p-4 border-b border-surface-container-highest bg-[#1E293B] flex justify-between items-center">
        <h3 class="font-label-caps text-label-caps text-on-surface">RECENT CLERKED LOTS</h3>
        <span class="bg-surface-dim text-on-surface-variant font-data-tabular text-data-tabular px-2 py-0.5 rounded text-xs border border-surface-container-highest">Last {{ recentLots.length }}</span>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <!-- Dynamic Log Items -->
        <div 
          v-for="lot in recentLots" 
          :key="lot.id"
          class="p-4 border-b border-surface-container-highest hover:bg-[#1E293B] transition-colors group"
          :class="{'bg-surface-dim': lot.status === 'PASSED'}"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <span 
                v-if="lot.status === 'SOLD'" 
                class="bg-secondary text-on-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded"
              >
                SOLD
              </span>
              <span 
                v-else 
                class="bg-error-container text-error border border-error/30 font-label-caps text-label-caps px-1.5 py-0.5 rounded"
              >
                PASSED
              </span>
              <span class="font-headline-md text-[16px] font-bold text-on-surface">Lot #{{ lot.lotNumber }}</span>
            </div>
            <span class="font-data-tabular text-data-tabular text-outline group-hover:text-on-surface-variant">{{ lot.time }}</span>
          </div>
          
          <div class="flex justify-between items-end">
            <div class="flex flex-col gap-0.5">
              <span 
                v-if="lot.status === 'SOLD'" 
                class="font-body-base text-body-base text-on-surface-variant text-[13px]"
              >
                Bidder #{{ lot.bidderId }}
              </span>
              <span 
                v-else 
                class="font-body-base text-body-base text-outline text-[13px] italic"
              >
                No Sale Recorded
              </span>
              <span class="font-data-tabular text-data-tabular text-outline text-xs">{{ lot.itemName }}</span>
            </div>
            <span 
              class="font-headline-md text-headline-md"
              :class="lot.status === 'SOLD' ? 'text-secondary' : 'text-[16px] text-outline line-through'"
            >
              {{ lot.price }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// Form State
const form = ref({
  lot: '402',
  bidder: '894',
  amount: '125,000'
})

// Mocked Historical Data
const recentLots = ref([
  { id: 1, status: 'SOLD', lotNumber: '401', time: '10:42 AM', bidderId: '112', itemName: 'Rolex Daytona 1989', price: '$32,000' },
  { id: 2, status: 'SOLD', lotNumber: '400', time: '10:38 AM', bidderId: '045', itemName: 'Patek Philippe Calatrava', price: '$18,500' },
  { id: 3, status: 'PASSED', lotNumber: '399', time: '10:35 AM', bidderId: null, itemName: 'Vintage Cartier Tank', price: '$12,000 Res.' },
  { id: 4, status: 'SOLD', lotNumber: '398', time: '10:31 AM', bidderId: '894', itemName: 'Omega Speedmaster Pro', price: '$6,200' },
  { id: 5, status: 'SOLD', lotNumber: '397', time: '10:28 AM', bidderId: '201', itemName: 'Audemars Piguet Royal Oak', price: '$45,000' }
])

// Actions
const recordSale = () => {
  if(!form.value.lot || !form.value.bidder || !form.value.amount) return;
  
  // Add new sale to top of array
  recentLots.value.unshift({
    id: Date.now(),
    status: 'SOLD',
    lotNumber: form.value.lot,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    bidderId: form.value.bidder,
    itemName: '1967 Ford Mustang Shelby GT500', // Mocking fetching item details
    price: `$${form.value.amount}`
  })

  clearForm()
}

const passSale = () => {
  if(!form.value.lot) return;

  // Add passed item to top of array
  recentLots.value.unshift({
    id: Date.now(),
    status: 'PASSED',
    lotNumber: form.value.lot,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    bidderId: null,
    itemName: '1967 Ford Mustang Shelby GT500', // Mocking fetching item details
    price: 'Reserve Not Met'
  })

  clearForm()
}

const undoLast = () => {
  if (recentLots.value.length > 0) {
    recentLots.value.shift() // Removes the most recent item
  }
}

const clearForm = () => {
  form.value.lot = ''
  form.value.bidder = ''
  form.value.amount = ''
}
</script>
