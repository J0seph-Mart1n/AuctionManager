<template>
  <!-- Wrapper replacing the body tag -->
  <div class="bg-background text-on-surface font-body-base h-screen overflow-hidden flex w-full">

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-screen relative">
      <!-- TopNavBar Component -->
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
                placeholder="Search [Ctrl+F]" 
                class="w-full bg-surface text-on-surface border border-outline-variant rounded pl-10 pr-4 py-2 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors font-body-base text-body-base placeholder:text-on-surface-variant" 
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="exportData" class="px-4 py-2 border border-outline-variant rounded text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 font-data-tabular text-data-tabular">
              <span class="material-symbols-outlined text-[18px]">download</span> Export
            </button>
            <button @click="addNewItem" class="px-4 py-2 bg-secondary text-on-secondary rounded hover:brightness-110 active:brightness-90 transition-all flex items-center gap-2 font-label-caps text-label-caps uppercase shadow-[0_0_10px_rgba(78,222,163,0.2)]">
              <span class="material-symbols-outlined text-[18px]">add</span> Add New Item
              <span class="text-[10px] opacity-70 ml-1 font-mono normal-case tracking-normal">[Ins]</span>
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
                  <th class="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase border-b border-surface-container-highest w-24">
                    Item <span class="material-symbols-outlined text-[14px] align-middle ml-1">arrow_downward</span>
                  </th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest">Item Title & Description</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest w-32 text-right">Amount</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest w-48">Shop</th>
                  <th class="py-3 px-4 font-label-caps text-label-caps text-outline uppercase border-b border-surface-container-highest w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="font-data-tabular text-data-tabular divide-y divide-surface-container-highest">
                
                <!-- Dynamic Rows -->
                <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-surface-variant/50 transition-colors group cursor-default">
                  <td class="py-3 px-4 text-center">
                    <input type="checkbox" v-model="item.selected" class="rounded bg-surface border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td class="py-3 px-4">
                    <span class="font-lot-id-display text-headline-md text-secondary tracking-tight">{{ item.itemNumber }}</span>
                  </td>
                  <td class="py-3 px-4 w-full max-w-[1px]">
                    <div class="flex flex-col">
                      <span class="text-on-surface font-semibold truncate">{{ item.title }}</span>
                      <span class="text-on-surface-variant text-xs truncate font-body-base">{{ item.description }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-right text-primary-fixed font-mono">{{ item.amount }}</td>
                  <td class="py-3 px-4 text-on-surface-variant">{{ item.shop }}</td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="editItem(item.id)" class="p-1 text-on-surface-variant hover:text-secondary transition-colors" title="Edit [E]">
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button @click="deleteItem(item.id)" class="p-1 text-on-surface-variant hover:text-error transition-colors" title="Delete [Del]">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Empty State -->
                <tr v-if="filteredItems.length === 0">
                  <td colspan="7" class="py-8 text-center text-on-surface-variant">
                    No items found matching your search.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination Footer -->
          <div class="bg-surface-container p-3 border-t border-surface-container-highest flex items-center justify-between text-on-surface-variant text-sm shrink-0">
            <div>
              Showing <span class="font-semibold text-on-surface">1</span> to <span class="font-semibold text-on-surface">{{ filteredItems.length }}</span> of <span class="font-semibold text-on-surface">{{ items.length }}</span> items
            </div>
            <div class="flex items-center gap-2">
              <button class="p-1 hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <span class="font-data-tabular">Page 1 of 1</span>
              <button class="p-1 hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Item Modal Component -->
    <AddItemModal 
      :show="showAddModal" 
      :initial-data="itemToEdit"
      @close="closeAddModal" 
      @save="saveItem" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopNavBar from '@/components/TopNavBar.vue'
import AddItemModal from '@/components/AddItemModal.vue'
import { exportToCSV } from '@/utils/export.js'

const searchQuery = ref('')
const showAddModal = ref(false)
const itemToEdit = ref(null)

// Mock Data
const items = ref([
  { 
    id: 1, 
    itemNumber: '1001', 
    title: '1967 Ford Mustang Shelby GT500', 
    description: 'Original condition, matching numbers, 428 Police Interceptor V8.', 
    amount: '₹125,000', 
    shop: 'Classic Motors LLC', 
    selected: false
  },
  { 
    id: 2, 
    itemNumber: '1002', 
    title: 'Patek Philippe Nautilus Ref. 5711', 
    description: 'Stainless steel, blue dial, complete with box and papers.', 
    amount: '₹85,000', 
    shop: 'Private Collector (ID: 442)', 
    selected: false
  },
  { 
    id: 3, 
    itemNumber: '1003', 
    title: 'Original Banksy Screenprint "Girl with Balloon"', 
    description: 'Signed edition of 150. Pest Control COA included.', 
    amount: '₹150,000', 
    shop: 'Urban Art Gallery', 
    selected: false
  },
  { 
    id: 4, 
    itemNumber: '1004', 
    title: 'Mid-Century Modern Teak Credenza', 
    description: 'Hans Wegner for Ry Møbler. Minor restoration needed on left door.', 
    amount: '₹4,500', 
    shop: 'Estate Liquidators Inc.', 
    selected: false
  }
])

// Computed property for Search Filtering
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  
  const query = searchQuery.value.toLowerCase()
  return items.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.itemNumber.toLowerCase().includes(query) ||
    item.shop.toLowerCase().includes(query)
  )
})

// Methods
const toggleAll = (event) => {
  const isChecked = event.target.checked
  filteredItems.value.forEach(item => {
    item.selected = isChecked
  })
}

const addNewItem = () => {
  itemToEdit.value = null
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
}

const saveItem = (itemData) => {
  const formattedReserve = itemData.amount.startsWith('₹') ? itemData.amount : `₹${itemData.amount}`
  
  if (itemData.id) {
    const index = items.value.findIndex(i => i.id === itemData.id)
    if (index !== -1) {
      items.value[index].title = itemData.title
      items.value[index].description = itemData.description
      items.value[index].amount = formattedReserve
      items.value[index].shop = itemData.shop
    }
  } else {
    items.value.unshift({
      id: Date.now(),
      itemNumber: (1000 + items.value.length + 1).toString(),
      title: itemData.title,
      description: itemData.description,
      amount: formattedReserve,
      shop: itemData.shop,
      selected: false
    })
  }
  
  closeAddModal()
}

const editItem = (id) => {
  const item = items.value.find(i => i.id === id)
  if (item) {
    itemToEdit.value = {
      id: item.id,
      title: item.title,
      description: item.description,
      amount: item.amount.replace('₹', '').replace(',', ''),
      shop: item.shop
    }
    showAddModal.value = true
  }
}

const deleteItem = (id) => {
  if(confirm('Are you sure you want to delete this item?')) {
    items.value = items.value.filter(item => item.id !== id)
  }
}

const exportData = () => {
  const dataToExport = filteredItems.value.map(item => ({
    'Item No': item.itemNumber,
    'Title': item.title,
    'Description': item.description,
    'Amount': item.amount,
    'Shop': item.shop,
  }))
  exportToCSV(dataToExport, 'PreAuction_Catalog.csv')
}
</script>

<style scoped>
/* Material Icons Configuration */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.material-symbols-outlined[data-weight="fill"] {
  font-variation-settings: 'FILL' 1;
}

/* Custom Scrollbar for Data Tables and Application */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #051426; 
}
::-webkit-scrollbar-thumb {
  background: #273649; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #45464d; 
}
</style>