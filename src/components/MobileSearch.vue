<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from './ui/button'
import { SearchIcon, XIcon } from 'lucide-vue-next'
import { Input } from './ui/input'
import { useGlobalStore } from '@/stores/globalStore'
import { useRoute, useRouter } from 'vue-router'

const store = useGlobalStore()

const isOpen = computed(() => store.isShowMobileSearch)

const router = useRouter()
const route = useRoute()

const searchValue = ref('')

const handleEnter = () => {
  if (searchValue.value) {
    router.push({ name: 'search', query: { ...route.query, q: searchValue.value, page: '1' } })
  } else {
    router.push({ name: 'search', query: { ...route.query, q: '', page: '1' } })
  }
}
</script>

<template>
  <div class="md:hidden flex items-center relative gap-2 w-auto">
    <div v-if="isOpen">
      <Input
        placeholder="Tìm theo tên phim..."
        @keydown.enter="handleEnter"
        v-model="searchValue"
      />
    </div>
    <Button size="icon" @click="store.toggleMobileSearch">
      <SearchIcon v-if="!isOpen" />
      <XIcon v-else />
      <span class="sr-only">Tìm kiếm</span>
    </Button>
  </div>
</template>
