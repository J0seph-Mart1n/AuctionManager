<template>
  <div class="bg-background text-on-background min-h-screen flex selection:bg-primary selection:text-on-primary">

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-h-screen">
      
      <!-- TopNavBar -->
      <header class="bg-[#0F172A] flex items-center justify-between px-6 h-14 w-full border-b border-slate-700 z-10 sticky top-0">
        <div class="flex items-center gap-4">
          <span class="text-lg font-black tracking-tighter text-slate-50 uppercase">AuctionPro</span>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-4">
            <button class="font-inter text-sm font-medium tracking-tight text-emerald-500 dark:text-emerald-400 hover:bg-slate-800 transition-colors active:bg-slate-700 duration-75 px-3 py-1.5 rounded-DEFAULT flex items-center gap-2">
              Clerk
            </button>
            <button class="font-inter text-sm font-medium tracking-tight text-slate-400 hover:bg-slate-800 transition-colors active:bg-slate-700 duration-75 px-3 py-1.5 rounded-DEFAULT flex items-center gap-2 border border-slate-700">
              Backup [F10]
            </button>
          </div>
          <div class="flex items-center gap-2 border-l border-slate-700 pl-4">
            <button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors p-2 rounded-DEFAULT flex items-center justify-center">
              <span class="material-symbols-outlined">wifi_off</span>
            </button>
            <button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors p-2 rounded-DEFAULT flex items-center justify-center">
              <span class="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Workspace (POS Terminal Layout) -->
      <main class="flex-1 p-gutter grid grid-cols-12 gap-gutter h-[calc(100vh-3.5rem)] overflow-hidden">
        
        <!-- Left Column: Operations & Details -->
        <div class="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-gutter h-full">
          
          <!-- Search Module -->
          <section class="bg-surface-container border border-outline-variant p-md flex items-center gap-sm">
            <span class="material-symbols-outlined text-on-surface-variant text-xl">search</span>
            <input 
              v-model="searchQuery"
              class="bg-transparent border-none text-on-surface font-body-base text-body-base placeholder-on-surface-variant flex-1 focus:ring-0 p-0 h-full" 
              placeholder="Search by Bidder # or Name" 
              type="text" 
            />
            <kbd class="font-data-tabular text-data-tabular text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-DEFAULT border border-outline-variant text-xs">[F3]</kbd>
          </section>

          <!-- Bidder Profile Card -->
          <section class="bg-surface-container border border-outline-variant p-lg flex-shrink-0">
            <div class="flex justify-between items-start mb-md">
              <div>
                <h2 class="font-headline-md text-headline-md text-on-surface mb-1 flex items-center gap-2">
                  {{ bidder.name }}
                  <span class="bg-primary text-on-primary font-label-caps text-label-caps px-2 py-0.5 rounded-DEFAULT">#{{ bidder.paddleNumber }}</span>
                </h2>
                <p class="font-body-base text-body-base text-on-surface-variant">{{ bidder.company }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span 
                  class="font-label-caps text-label-caps px-3 py-1 rounded-DEFAULT border flex items-center gap-1"
                  :class="bidder.status === 'UNPAID' ? 'bg-error-container text-on-error-container border-error' : 'bg-secondary-container text-on-secondary-container border-secondary'"
                >
                  <span class="material-symbols-outlined text-[14px]">
                    {{ bidder.status === 'UNPAID' ? 'warning' : 'check_circle' }}
                  </span>
                  {{ bidder.status }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-md pt-md border-t border-outline-variant">
              <div>
                <span class="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Billing Address</span>
                <p class="font-body-base text-body-base text-on-surface whitespace-pre-line">{{ bidder.address }}</p>
              </div>
              <div>
                <span class="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Tax Status</span>
                <div class="flex items-center gap-2 mt-1">
                  <span 
                    class="material-symbols-outlined text-sm"
                    :class="bidder.isTaxExempt ? 'text-secondary' : 'text-on-surface-variant'"
                  >
                    {{ bidder.isTaxExempt ? 'check_circle' : 'receipt_long' }}
                  </span>
                  <span class="font-body-base text-body-base text-on-surface">{{ bidder.taxStatusMessage }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Action / Payment Terminal -->
          <section class="bg-surface-container border border-outline-variant p-lg flex-1 flex flex-col">
            <h3 class="font-headline-md text-headline-md text-on-surface mb-lg border-b border-outline-variant pb-md">Payment Processing</h3>
            
            <!-- Dynamic Payment Method Selection -->
            <div class="grid grid-cols-4 gap-sm mb-lg">
              <button 
                v-for="method in paymentMethods" 
                :key="method.id"
                @click="selectedMethod = method.id"
                class="font-body-base text-body-base py-3 flex flex-col items-center justify-center gap-1 transition-colors border"
                :class="selectedMethod === method.id 
                  ? 'bg-surface-bright border-secondary text-secondary hover:bg-secondary/10' 
                  : 'bg-surface text-on-surface-variant border-outline-variant hover:bg-surface-bright'"
              >
                <span class="material-symbols-outlined">{{ method.icon }}</span>
                {{ method.label }}
              </button>
            </div>
            
            <div class="mt-auto flex gap-md">
              <button @click="processPayment" class="flex-1 bg-secondary text-on-secondary font-body-base text-body-base font-semibold py-4 flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors">
                <span class="material-symbols-outlined">point_of_sale</span>
                Process Payment [Enter]
              </button>
              <button @click="generatePDF" class="flex-1 bg-surface-bright border border-outline-variant text-on-surface font-body-base text-body-base py-4 flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors">
                <span class="material-symbols-outlined">picture_as_pdf</span>
                Generate Invoice PDF
              </button>
            </div>
          </section>
        </div>

        <!-- Right Column: Consolidated Cart / Receipt -->
        <div class="col-span-12 lg:col-span-5 xl:col-span-4 bg-surface-container-lowest border border-outline-variant flex flex-col h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <div class="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container">
            <h3 class="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Consolidated Cart</h3>
            <span class="font-data-tabular text-data-tabular text-on-surface-variant">{{ cartItems.length }} Items</span>
          </div>
          
          <!-- Scrollable Item List -->
          <div class="flex-1 overflow-y-auto p-md font-data-tabular text-data-tabular">
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-2 text-on-surface-variant font-label-caps text-label-caps mb-sm pb-sm border-b border-surface-variant uppercase">
              <div class="col-span-2">Lot</div>
              <div class="col-span-7">Description</div>
              <div class="col-span-3 text-right">Hammer</div>
            </div>
            
            <!-- Items Loop -->
            <div 
              v-for="item in cartItems" 
              :key="item.lot"
              class="grid grid-cols-12 gap-2 text-on-surface py-3 border-b border-surface-variant hover:bg-surface-container transition-colors"
            >
              <div class="col-span-2">{{ item.lot }}</div>
              <div class="col-span-7 truncate" :title="item.description">{{ item.description }}</div>
              <div class="col-span-3 text-right">{{ formatCurrency(item.price) }}</div>
            </div>
          </div>

          <!-- Totals Section -->
          <div class="p-lg bg-surface-container border-t border-outline-variant mt-auto">
            <div class="flex justify-between items-center mb-2 font-data-tabular text-data-tabular text-on-surface-variant">
              <span>Subtotal (Hammer)</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between items-center mb-2 font-data-tabular text-data-tabular text-on-surface-variant">
              <span>Buyer's Premium ({{ buyersPremiumPercentage * 100 }}%)</span>
              <span>{{ formatCurrency(buyersPremium) }}</span>
            </div>
            <div class="flex justify-between items-center mb-4 font-data-tabular text-data-tabular text-on-surface-variant">
              <span>Sales Tax ({{ bidder.isTaxExempt ? 'Exempt' : `${taxRate * 100}%` }})</span>
              <span>{{ formatCurrency(taxAmount) }}</span>
            </div>
            <div class="border-t-2 border-outline border-dashed pt-4 flex justify-between items-end">
              <span class="font-label-caps text-label-caps text-on-surface uppercase tracking-widest pb-1">Total Due</span>
              <span class="font-bid-amount-lg text-bid-amount-lg text-secondary tabular-nums">{{ formatCurrency(totalDue) }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- State Variables ---
const searchQuery = ref('Bidder #402 - Smithson, J')

// Mocked Bidder Profile
const bidder = ref({
  paddleNumber: '402',
  name: 'James Smithson',
  company: 'Smithson Antiques Ltd.',
  status: 'UNPAID',
  address: '142 Industrial Pkwy\nSuite 300\nChicago, IL 60601',
  isTaxExempt: true,
  taxStatusMessage: 'Tax Exempt on File (Resale)'
})

// Mocked Cart Data
const cartItems = ref([
  { lot: '104A', description: 'Vintage Industrial Workbench', price: 1200.00 },
  { lot: '212', description: 'Set of 4 Eames Style Chairs', price: 850.00 },
  { lot: '305', description: 'Bronze Table Lamp circa 1920', price: 425.00 }
])

// Payment Options
const paymentMethods = ref([
  { id: 'credit_card', icon: 'credit_card', label: 'Credit Card' },
  { id: 'cash', icon: 'payments', label: 'Cash' },
  { id: 'wire', icon: 'account_balance', label: 'Wire Transfer' },
  { id: 'check', icon: 'draft', label: 'Check' }
])
const selectedMethod = ref('credit_card') // Default selection

// Settings (Could be fetched from API)
const buyersPremiumPercentage = ref(0.10) // 10%
const taxRate = ref(0.08) // 8% Default state tax

// --- Computed Financials ---
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0)
})

const buyersPremium = computed(() => {
  return subtotal.value * buyersPremiumPercentage.value
})

const taxAmount = computed(() => {
  if (bidder.value.isTaxExempt) return 0
  // Usually, tax applies to (Hammer Price + Buyer's Premium)
  return (subtotal.value + buyersPremium.value) * taxRate.value 
})

const totalDue = computed(() => {
  return subtotal.value + buyersPremium.value + taxAmount.value
})

// --- Helper Methods ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)
}

// --- Actions ---
const processPayment = () => {
  const methodLabel = paymentMethods.value.find(m => m.id === selectedMethod.value)?.label
  alert(`Processing payment of ${formatCurrency(totalDue.value)} via ${methodLabel}...`)
  
  // Example of what to do next:
  // bidder.value.status = 'PAID'
}

const generatePDF = () => {
  alert('Generating Invoice PDF...')
}
</script>

<style scoped>
/* Material Icons Setup Specific to this component */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Scrollbar customization for the cart */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: #273649; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #45464d; 
}
</style>