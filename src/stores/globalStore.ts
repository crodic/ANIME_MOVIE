import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', {
  state() {
    return {
      isShowMobileSearch: false,
    }
  },
  actions: {
    toggleMobileSearch() {
      this.isShowMobileSearch = !this.isShowMobileSearch
    },
  },
})
