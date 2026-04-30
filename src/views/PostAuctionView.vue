<template>
  <div class="bg-background text-on-background min-h-screen flex selection:bg-primary selection:text-on-primary">

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-h-screen h-screen overflow-hidden">
      
      <!-- TopNavBar -->
      <TopNavBar />

      <!-- Canvas -->
      <div class="flex-1 overflow-auto bg-background p-6 flex flex-col gap-6">
        <!-- Action Bar -->
        <div class="flex items-center justify-between bg-surface-container-low p-4 rounded-lg border border-surface-container-highest shrink-0">
          <div class="flex items-center gap-4 flex-1 mr-6">
            <div class="relative w-full">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search by Item, Bidder or Ward [Ctrl+F]" 
                class="w-full bg-surface text-on-surface border border-outline-variant rounded pl-10 pr-4 py-2 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors font-body-base text-body-base placeholder:text-on-surface-variant" 
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="exportData" class="px-4 py-2 border border-outline-variant rounded text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 font-data-tabular text-data-tabular">
              <span class="material-symbols-outlined text-[18px]">download</span> Export
            </button>
          </div>
        </div>

        <!-- Data Table Container -->
        <div class="bg-surface-container-low rounded-lg border border-surface-container-highest flex-1 flex flex-col overflow-hidden">
          <div class="overflow-x-auto flex-1">
            <table class="w-full text-left border-collapse whitespace-nowrap">
              <thead class="bg-surface-container sticky top-0 z-10">
                <tr>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest w-12 text-center">
                    <input type="checkbox" class="rounded bg-surface border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-background" @change="toggleAll" />
                  </th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest">Item Name</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest">Bidder Name</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest">Ward Name</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest text-center">Payment Method</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest text-center">Status</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest text-right">Amount</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody class="font-data-tabular text-data-tabular divide-y divide-surface-container-highest">
                
                <!-- Dynamic Rows -->
                <tr v-for="entry in filteredEntries" :key="entry.id" class="hover:bg-surface-variant/50 transition-colors group cursor-default">
                  <td class="py-3 px-4 text-center">
                    <input type="checkbox" v-model="entry.selected" class="rounded bg-surface border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td class="py-3 px-4 w-full max-w-[1px]">
                    <div class="flex flex-col">
                      <span class="text-on-surface font-semibold truncate">{{ entry.itemName }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-on-surface-variant truncate max-w-[150px]">{{ entry.bidderName }}</td>
                  <td class="py-3 px-4 text-on-surface-variant truncate max-w-[150px]">{{ entry.wardName }}</td>
                  <td class="py-3 px-4 text-center text-on-surface-variant capitalize">{{ entry.paymentMethod }}</td>
                  <td class="py-3 px-4 text-center">
                    <span 
                      class="font-label-caps text-label-caps px-2 py-0.5 rounded"
                      :class="entry.paymentDone ? 'bg-secondary text-on-secondary' : 'bg-error-container text-error border border-error/30'"
                    >
                      {{ entry.paymentDone ? 'PAID' : 'UNPAID' }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right text-primary-fixed font-mono">{{ formatCurrency(entry.amount) }}</td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="editEntry(entry.id)" class="p-1 text-on-surface-variant hover:text-secondary transition-colors" title="Edit [E]">
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button @click="deleteEntry(entry.id)" class="p-1 text-on-surface-variant hover:text-error transition-colors" title="Delete [Del]">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Empty State -->
                <tr v-if="filteredEntries.length === 0">
                  <td colspan="8" class="py-8 text-center text-on-surface-variant">
                    No entries found matching your search.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination Footer -->
          <div class="bg-surface-container p-3 border-t border-surface-container-highest flex items-center justify-between text-on-surface-variant text-sm shrink-0">
            <div>
              Showing <span class="font-semibold text-on-surface">{{ filteredEntries.length > 0 ? 1 : 0 }}</span> to <span class="font-semibold text-on-surface">{{ filteredEntries.length }}</span> of <span class="font-semibold text-on-surface">{{ entries.length }}</span> entries
            </div>
            <div class="flex items-center gap-2">
              <button class="p-1 hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button class="p-1 hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopNavBar from '@/components/TopNavBar.vue'

// --- State Variables ---
const searchQuery = ref('')

// Mocked Entries Data (representing data created in LiveAuction)
const entries = ref([
  { id: 1, itemName: 'Rolex Daytona 1989', bidderName: 'Joseph', wardName: 'Watches', paymentMethod: 'online', paymentDone: true, amount: 32000, selected: false },
  { id: 2, itemName: 'Patek Philippe Calatrava', bidderName: 'Alice', wardName: 'Watches', paymentMethod: 'cash', paymentDone: true, amount: 18500, selected: false },
  { id: 3, itemName: 'Vintage Cartier Tank', bidderName: 'Bob', wardName: 'Watches', paymentMethod: 'cash', paymentDone: false, amount: 12000, selected: false },
  { id: 4, itemName: 'Omega Speedmaster Pro', bidderName: 'Carol', wardName: 'Watches', paymentMethod: 'online', paymentDone: true, amount: 6200, selected: false },
  { id: 5, itemName: 'Audemars Piguet Royal Oak', bidderName: 'David', wardName: 'Watches', paymentMethod: 'online', paymentDone: true, amount: 45000, selected: false },
  { id: 6, itemName: 'Hermès Birkin 35', bidderName: 'Emma', wardName: 'Handbags', paymentMethod: 'cash', paymentDone: false, amount: 14500, selected: false }
])

// --- Computed ---
const filteredEntries = computed(() => {
  if (!searchQuery.value) return entries.value
  const query = searchQuery.value.toLowerCase()
  return entries.value.filter(entry => 
    entry.itemName.toLowerCase().includes(query) || 
    entry.bidderName.toLowerCase().includes(query) ||
    entry.wardName.toLowerCase().includes(query)
  )
})

// --- Helper Methods ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value)
}

// --- Actions ---
const toggleAll = (event) => {
  const isChecked = event.target.checked
  filteredEntries.value.forEach(entry => {
    entry.selected = isChecked
  })
}

const editEntry = (id) => {
  alert(`Editing Entry ID: ${id}`)
}

const deleteEntry = (id) => {
  if(confirm('Are you sure you want to delete this entry?')) {
    entries.value = entries.value.filter(e => e.id !== id)
  }
}

const exportData = () => {
  alert('Exporting data to CSV...')
}
</script>

<style scoped>
/* Material Icons Setup Specific to this component */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
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