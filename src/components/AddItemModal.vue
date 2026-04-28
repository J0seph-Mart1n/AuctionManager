<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-surface-container rounded-lg border border-surface-container-highest shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
      <div class="p-6 border-b border-surface-container-highest bg-[#1E293B] flex justify-between items-center">
        <h2 class="text-xl font-bold text-on-surface">Add New Item</h2>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="p-6 flex flex-col gap-4">
        <div>
          <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Title *</label>
          <input v-model="newItem.title" type="text" placeholder="Item Title" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Description</label>
          <textarea v-model="newItem.description" rows="3" placeholder="Item Description" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Amount *</label>
            <input v-model="newItem.amount" type="text" placeholder="$0.00" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Shop *</label>
            <input v-model="newItem.shop" type="text" placeholder="Consignor / Shop" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
          </div>
        </div>
      </div>
      <div class="p-6 border-t border-surface-container-highest bg-surface-container-low flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-highest rounded transition-colors font-semibold">
          Cancel
        </button>
        <button @click="handleSave" class="px-4 py-2 bg-secondary text-on-secondary hover:brightness-110 active:brightness-90 rounded transition-all font-semibold">
          Add Item
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const newItem = ref({
  title: '',
  description: '',
  amount: '',
  shop: ''
})

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    newItem.value = { title: '', description: '', amount: '', shop: '' }
  }
})

const handleSave = () => {
  if (!newItem.value.title || !newItem.value.amount || !newItem.value.shop) {
    alert("Please fill in the required fields (Title, Amount, Shop)")
    return
  }
  emit('save', { ...newItem.value })
}
</script>
