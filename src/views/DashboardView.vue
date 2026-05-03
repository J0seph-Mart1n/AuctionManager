<template>
  <div class="flex flex-col h-full bg-surface-container-lowest overflow-hidden">
    <TopNavBar>
      <template #left>
        <span class="text-on-surface text-lg font-bold tracking-wide">STATISTICS DASHBOARD</span>
      </template>
    </TopNavBar>

    <main class="flex-1 overflow-y-auto p-6 md:p-10 relative">
      <!-- Background Decorative Elements -->
      <div class="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-6xl mx-auto relative z-10 flex flex-col gap-8">
        
        <!-- Header Section -->
        <header class="flex flex-col gap-2">
          <h1 class="font-display text-4xl md:text-5xl text-on-surface font-bold tracking-tight">Auction Overview</h1>
          <p class="text-on-surface-variant text-lg">Real-time metrics and sales performance.</p>
        </header>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>

        <div v-else class="flex flex-col gap-6">
          <!-- Hero Card: Total Bidded Amount -->
          <div class="group relative bg-gradient-to-br from-surface-container to-surface-container-high rounded-3xl p-8 border border-outline-variant/30 overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300">
            <!-- Subtle gradient glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="p-3 bg-emerald-500/20 text-emerald-400 rounded-full">
                  <span class="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <h2 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Total Bidded Amount</h2>
              </div>
              <p class="font-display text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 tracking-tighter">
                {{ formatCurrency(totalAmount) }}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                  <span class="w-2 h-2 mr-2 bg-white rounded-full animate-pulse"></span>
                  Live Updates
                </span>
                <span class="text-on-surface-variant text-sm font-medium">{{ totalSalesCount }} total transactions</span>
              </div>
            </div>
          </div>

          <!-- 2x2 Grid for Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Paid Amount -->
            <div class="bg-surface-container rounded-3xl p-6 border border-outline-variant/30 hover:bg-surface-container-high hover:border-secondary/30 transition-all duration-300 shadow-sm flex flex-col gap-3 group">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-500/10 text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined">check_circle</span>
                </div>
                <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Paid</h3>
              </div>
              <p class="font-display text-4xl font-bold text-on-surface tracking-tight">{{ formatCurrency(paidAmount) }}</p>
              <div class="w-full bg-surface-dim h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-blue-400 h-full rounded-full transition-all duration-1000" :style="{ width: paidPercentage + '%' }"></div>
              </div>
              <span class="text-xs text-on-surface-variant text-right">{{ paidPercentage }}% of total</span>
            </div>

            <!-- Unpaid Amount -->
            <div class="bg-surface-container rounded-3xl p-6 border border-outline-variant/30 hover:bg-surface-container-high hover:border-error/30 transition-all duration-300 shadow-sm flex flex-col gap-3 group">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-amber-500/10 text-amber-400 rounded-full group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined">pending_actions</span>
                </div>
                <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Unpaid</h3>
              </div>
              <p class="font-display text-4xl font-bold text-on-surface tracking-tight">{{ formatCurrency(unpaidAmount) }}</p>
              <div class="w-full bg-surface-dim h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full transition-all duration-1000" :style="{ width: unpaidPercentage + '%' }"></div>
              </div>
              <span class="text-xs text-on-surface-variant text-right">{{ unpaidPercentage }}% of total</span>
            </div>

            <!-- Cash Amount -->
            <div class="bg-surface-container rounded-3xl p-6 border border-outline-variant/30 hover:bg-surface-container-high hover:border-green-500/30 transition-all duration-300 shadow-sm flex flex-col gap-3 group">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-green-500/10 text-green-400 rounded-full group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined">payments</span>
                </div>
                <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase">Cash Collection</h3>
              </div>
              <p class="font-display text-4xl font-bold text-on-surface tracking-tight">{{ formatCurrency(cashAmount) }}</p>
            </div>

            <!-- Online Amount -->
            <div class="bg-surface-container rounded-3xl p-6 border border-outline-variant/30 hover:bg-surface-container-high hover:border-purple-500/30 transition-all duration-300 shadow-sm flex flex-col gap-3 group">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-purple-500/10 text-purple-400 rounded-full group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined">credit_card</span>
                </div>
                <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase">Online Transactions</h3>
              </div>
              <p class="font-display text-4xl font-bold text-on-surface tracking-tight">{{ formatCurrency(onlineAmount) }}</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TopNavBar from '@/components/TopNavBar.vue'

const API_URL = 'http://localhost:3000/api/sales'
const sales = ref([])
const loading = ref(true)

const fetchSales = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    sales.value = data
  } catch (error) {
    console.error('Failed to fetch sales for dashboard:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSales()
})

// Metrics Computation
const totalSalesCount = computed(() => sales.value.length)

const totalAmount = computed(() => {
  return sales.value.reduce((sum, sale) => sum + (sale.amount || 0), 0)
})

const paidAmount = computed(() => {
  return sales.value
    .filter(sale => sale.paymentDone)
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)
})

const unpaidAmount = computed(() => {
  return sales.value
    .filter(sale => !sale.paymentDone)
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)
})

const cashAmount = computed(() => {
  return sales.value
    .filter(sale => sale.paymentMethod === 'cash')
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)
})

const onlineAmount = computed(() => {
  return sales.value
    .filter(sale => sale.paymentMethod === 'online')
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)
})

// Percentages for progress bars
const paidPercentage = computed(() => {
  if (totalAmount.value === 0) return 0;
  return Math.round((paidAmount.value / totalAmount.value) * 100)
})

const unpaidPercentage = computed(() => {
  if (totalAmount.value === 0) return 0;
  return Math.round((unpaidAmount.value / totalAmount.value) * 100)
})

// Helper Method
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value)
}
</script>

<style scoped>
/* Ensure material icons load nicely */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Custom fonts styling override */
.font-display {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
