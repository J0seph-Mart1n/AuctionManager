<template>
  <!-- TopNavBar -->
  <TopNavBar />

  <!-- Canvas -->
  <main class="flex-1 overflow-hidden flex p-6 gap-6">
    <!-- Left Column: Input Forms -->
    <div class="flex-[2] flex flex-col gap-6">
      
      <!-- Lot & Bidder Entry Block -->
      <div class="bg-surface-container rounded-xl border border-surface-container-highest p-8 flex flex-col gap-8 shadow-sm">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-2 gap-8">
            <!-- Item Name Input -->
            <div class="flex flex-col gap-2">
              <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
                ITEM NAME <span class="text-outline">ALT+I</span>
              </label>
              <div class="relative">
                <input v-model="form.itemName" type="text" placeholder="e.g. Vintage Watch" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-body-base text-body-base rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary placeholder-surface-bright" />
              </div>
            </div>
  
            <!-- Group Name Input -->
            <div class="flex flex-col gap-2">
              <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
                WARD NAME
              </label>
              <div class="relative">
                <input v-model="form.wardName" type="text" placeholder="e.g. Jewelry" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-body-base text-body-base rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary placeholder-surface-bright" />
              </div>
            </div>
          </div>

          <!-- Bidder Name Input -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
              BIDDER NAME <span class="text-outline">ALT+B</span>
            </label>
            <div class="relative">
              <input v-model="form.bidderName" type="text" placeholder="e.g. John Doe" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-body-base text-body-base rounded-lg px-4 py-3 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary placeholder-surface-bright" />
            </div>
          </div>

          <!-- Payment Row -->
          <div class="grid grid-cols-2 gap-8 bg-surface-container-low p-4 rounded-lg border border-outline-variant items-center">
            <div class="flex flex-col gap-3">
              <label class="font-label-caps text-label-caps text-on-surface-variant">
                PAYMENT METHOD
              </label>
              <div class="flex items-center gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="form.paymentMethod" value="cash" class="text-secondary focus:ring-secondary bg-surface-dim border-outline-variant w-4 h-4" />
                  <span class="font-body-base text-on-surface">Cash</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="form.paymentMethod" value="online" class="text-secondary focus:ring-secondary bg-surface-dim border-outline-variant w-4 h-4" />
                  <span class="font-body-base text-on-surface">Online</span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-end">
              <label class="flex items-center gap-3 cursor-pointer bg-surface-dim px-4 py-2 rounded border border-outline-variant hover:bg-surface-container transition-colors">
                <input type="checkbox" v-model="form.paymentDone" class="rounded text-secondary focus:ring-secondary bg-surface-dim border-outline-variant w-5 h-5" />
                <span class="font-body-base text-on-surface font-semibold tracking-wide">PAYMENT DONE</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Winning Amount -->
        <div class="flex flex-col gap-2 border-t border-surface-container-highest pt-8">
          <label class="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
            FINAL AMOUNT <span class="text-outline">ALT+A</span>
          </label>
          <div class="relative">
            <span class="absolute left-6 top-1/2 -translate-y-1/2 font-bid-amount-lg text-bid-amount-lg text-outline">₹</span>
            <input v-model="form.amount" type="text" placeholder="0" class="w-full bg-surface-dim border-2 border-primary-container text-on-surface font-bid-amount-lg text-bid-amount-lg rounded-lg py-6 pl-16 pr-6 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary tracking-wider" />
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="grid grid-cols-3 gap-4 mt-auto">
        <button @click="recordSale" class="col-span-2 bg-secondary text-on-secondary font-headline-md text-headline-md rounded-lg py-5 flex items-center justify-center gap-3 hover:bg-secondary-fixed transition-colors border border-transparent focus:ring-4 focus:ring-secondary focus:ring-opacity-50">
          <span class="material-symbols-outlined font-bold text-2xl" style="font-variation-settings: 'FILL' 1;">gavel</span>
          RECORD SALE
        </button>
        <button @click="clearForm" class="bg-surface-container text-on-surface font-body-base text-body-base rounded-lg py-5 flex items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container-highest transition-colors">
          <span class="material-symbols-outlined text-[20px]">delete</span>
          Clear Entry
        </button>
      </div>
    </div>

    <!-- Right Column: Verification Log -->
    <div class="flex-1 flex flex-col bg-surface-container rounded-xl border border-surface-container-highest overflow-hidden">
      <div class="p-4 border-b border-surface-container-highest bg-[#1E293B] flex justify-between items-center">
        <h3 class="font-label-caps text-label-caps text-on-surface">RECENT BIDDING</h3>
        <span class="bg-surface-dim text-on-surface-variant font-data-tabular text-data-tabular px-2 py-0.5 rounded text-xs border border-surface-container-highest">Last {{ recentLots.length }}</span>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <!-- Dynamic Log Items -->
        <div 
          v-for="lot in recentLots" 
          :key="lot.id"
          class="p-4 border-b border-surface-container-highest hover:bg-[#1E293B] transition-colors group"
          :class="{'bg-surface-dim': lot.status === 'UNPAID'}"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <span 
                v-if="lot.status === 'PAID'" 
                class="bg-secondary text-on-secondary font-label-caps text-label-caps px-1.5 py-0.5 rounded"
              >
                PAID
              </span>
              <span 
                v-else 
                class="bg-error-container text-error border border-error/30 font-label-caps text-label-caps px-1.5 py-0.5 rounded"
              >
                UNPAID
              </span>
              <span class="font-headline-md text-[16px] font-bold text-on-surface">Item No. {{ lot.ItemNumber }}</span>
            </div>
            <span class="font-data-tabular text-data-tabular text-outline group-hover:text-on-surface-variant">{{ lot.time }}</span>
          </div>
          
          <div class="flex justify-between items-end">
            <div class="flex flex-col gap-0.5">
              <span 
                class="font-body-base text-body-base text-on-surface-variant text-[13px]"
              >
                Bidder Name: {{ lot.bidderName }}
              </span>
              <span class="font-data-tabular text-data-tabular text-outline text-xs">Item: {{ lot.itemName }}</span>
            </div>
            <span 
              class="font-headline-md text-headline-md text-secondary"
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
import TopNavBar from '@/components/TopNavBar.vue'

// Form State
const form = ref({
  itemName: '',
  bidderName: '',
  wardName: '',
  paymentMethod: 'cash',
  paymentDone: false,
  amount: ''
})

// Mocked Historical Data
const recentLots = ref([
  { id: 1, status: 'PAID', ItemNumber: '401', time: '10:42 AM', bidderName: 'Joseph', itemName: 'Rolex Daytona 1989', price: '₹32,000' },
  { id: 2, status: 'PAID', ItemNumber: '400', time: '10:38 AM', bidderName: 'Alice', itemName: 'Patek Philippe Calatrava', price: '₹18,500' },
  { id: 3, status: 'UNPAID', ItemNumber: '399', time: '10:35 AM', bidderName: 'Bob', itemName: 'Vintage Cartier Tank', price: '₹12,000' },
  { id: 4, status: 'PAID', ItemNumber: '398', time: '10:31 AM', bidderName: 'Carol', itemName: 'Omega Speedmaster Pro', price: '₹6,200' },
  { id: 5, status: 'PAID', ItemNumber: '397', time: '10:28 AM', bidderName: 'David', itemName: 'Audemars Piguet Royal Oak', price: '₹45,000' }
])

// Actions
const recordSale = () => {
  if(!form.value.itemName || !form.value.bidderName || !form.value.amount || !form.value.paymentMethod || !form.value.wardName){
    alert('Please fill all the required fields');
    return;
  }
  
  // Add new sale to top of array
  recentLots.value.unshift({
    id: Date.now(),
    status: form.value.paymentDone ? 'PAID' : 'UNPAID',
    ItemNumber: 'N/A',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    bidderName: form.value.bidderName,
    itemName: form.value.itemName, 
    price: `₹${form.value.amount}`
  })

  clearForm()
}

const clearForm = () => {
  form.value.itemName = ''
  form.value.bidderName = ''
  form.value.wardName = ''
  form.value.paymentMethod = 'cash'
  form.value.paymentDone = false
  form.value.amount = ''
}
</script>