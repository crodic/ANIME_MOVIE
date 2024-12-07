<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { getCategories } from '@/services/api'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { AlignJustify } from 'lucide-vue-next'

const isOpen = ref(false)

const handleOpenOrClose = () => {
  isOpen.value = !isOpen.value
}

const { data } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories(),
})
</script>

<template>
  <DropdownMenu :modal="false" :open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button @click="handleOpenOrClose" size="icon">
        <AlignJustify />
        <span class="sr-only">Danh sách thể loại</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-full max-w-4xl p-4">
      <div class="grid grid-cols-3 md:grid-cols-5 gap-4 w-full">
        <RouterLink
          :to="{ name: 'search', query: { category: category.slug } }"
          @click="handleOpenOrClose"
          v-for="category in data?.items"
          :key="category._id"
          class="cursor-pointer hover:bg-foreground hover:text-background p-1 text-center"
        >
          {{ category.name }}
        </RouterLink>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
