<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-surface-container rounded-lg border border-surface-container-highest shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
      <div class="p-6 border-b border-surface-container-highest bg-[#1E293B] flex justify-between items-center">
        <h2 class="text-xl font-bold text-on-surface">Edit Bidding Entry</h2>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="p-6 flex flex-col gap-4">
        <div>
          <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Item Name *</label>
          <input v-model="editItem.itemName" type="text" placeholder="Item Name" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Bidder Name *</label>
            <input v-model="editItem.bidderName" type="text" placeholder="Bidder Name" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Ward Name *</label>
            <input v-model="editItem.wardName" type="text" placeholder="Ward Name" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Amount *</label>
            <input v-model="editItem.amount" type="text" placeholder="0" class="w-full bg-surface-container-highest border border-outline-variant rounded px-4 py-2 font-body-base text-body-base text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" />
          </div>
          <div class="flex flex-col justify-center">
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Payment Method</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="editItem.paymentMethod" value="cash" class="text-secondary focus:ring-secondary bg-surface-container-highest border-outline-variant w-4 h-4" />
                <span class="font-body-base text-on-surface">Cash</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="editItem.paymentMethod" value="online" class="text-secondary focus:ring-secondary bg-surface-container-highest border-outline-variant w-4 h-4" />
                <span class="font-body-base text-on-surface">Online</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="flex items-center gap-3 cursor-pointer mt-2 bg-surface-container-highest p-3 rounded border border-outline-variant">
            <input type="checkbox" v-model="editItem.paymentDone" class="rounded text-secondary focus:ring-secondary bg-surface-container border-outline-variant w-5 h-5" />
            <span class="font-body-base text-on-surface font-semibold tracking-wide uppercase">Payment Done</span>
          </label>
        </div>
      </div>
      <div class="p-6 border-t border-surface-container-highest bg-surface-container-low flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-highest rounded transition-colors font-semibold">
          Cancel
        </button>
        <button @click="handleSave" class="px-4 py-2 bg-secondary text-on-secondary hover:brightness-110 active:brightness-90 rounded transition-all font-semibold">
          Save Changes
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
  },
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const editItem = ref({
  itemName: '',
  bidderName: '',
  wardName: '',
  paymentMethod: 'cash',
  paymentDone: false,
  amount: ''
})

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.initialData) {
      editItem.value = { ...props.initialData }
    } else {
      editItem.value = { itemName: '', bidderName: '', wardName: '', paymentMethod: 'cash', paymentDone: false, amount: '' }
    }
  }
})

const handleSave = () => {
  if (isNaN(editItem.value.amount)) {
    alert("Amount should be a number")
    return
  }
  if (!editItem.value.itemName || !editItem.value.bidderName || !editItem.value.wardName || !editItem.value.amount) {
    alert("Please fill in the required fields (Item Name, Bidder Name, Ward Name, Amount)")
    return
  }
  emit('save', { ...editItem.value })
}
</script>
