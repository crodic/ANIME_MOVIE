<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import { Input } from './ui/input'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const searchValue = ref('')

const handleEnter = () => {
  if (searchValue.value) {
    router.push({ name: 'search', query: { ...route.query, q: searchValue.value } })
  } else {
    router.push({ name: 'search', query: { ...route.query, q: '' } })
  }
}
</script>

<template>
  <div class="relative hidden md:block">
    <SearchIcon class="absolute top-2.5 left-2.5 w-5 h-5 text-muted-foreground" />
    <Input
      placeholder="Tìm theo tên phim..."
      class="w-[400px] pl-10"
      v-model="searchValue"
      @keydown.enter="handleEnter"
    />
  </div>
</template>
