import type { DataHistory } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieHistory = defineStore(
  'movieHistory',
  () => {
    const data = ref<DataHistory[]>([])

    const addHistory = (movie: DataHistory) => {
      const existingHistory = data.value.find((item) => item.episode_slug === movie.episode_slug)
      if (!existingHistory) {
        data.value = [...data.value, movie]
      }
    }

    return { data, addHistory }
  },
  {
    persist: { key: 'data-history', storage: localStorage },
  },
)
