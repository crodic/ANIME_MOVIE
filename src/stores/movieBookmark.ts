import { toast } from '@/components/ui/toast'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieBookmark = defineStore(
  'movieBookmark',
  () => {
    const bookmarks = ref<string[]>([])

    const addBookmark = (slug: string) => {
      if (!bookmarks.value.includes(slug)) {
        bookmarks.value = [...bookmarks.value, slug]
        toast({
          title: 'Đã đánh dấu anime',
          variant: 'success',
        })
      } else {
        bookmarks.value = bookmarks.value.filter((item) => item !== slug)
        toast({
          title: 'Xóa đánh dấu anime',
        })
      }
    }

    return { bookmarks, addBookmark }
  },
  {
    persist: { key: 'data-bookmark', storage: localStorage },
  },
)
