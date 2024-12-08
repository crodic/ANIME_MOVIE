<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Button from './ui/button/Button.vue'
import { useQuery } from '@tanstack/vue-query'
import { getCategories } from '@/services/api'
import { useRoute, useRouter } from 'vue-router'
import { ListFilter } from 'lucide-vue-next'

const isShowFilterCategory = ref(false)
const isShowFilterYear = ref(false)

const categories = ref<string[]>([])

const currentYear = new Date().getFullYear()
const years = ref<number[]>([])
for (let year = 1986; year <= currentYear; year++) {
  years.value.push(year)
}
const route = useRoute()
const router = useRouter()

const { data } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories(),
  staleTime: Infinity,
  gcTime: Infinity,
})

const handleOpenFilterCategory = () => {
  isShowFilterCategory.value = !isShowFilterCategory.value
}

const handleOpenFilterYear = () => {
  isShowFilterYear.value = !isShowFilterYear.value
}

const handleAddCategory = (category: string) => {
  const query = route.query
  const currentCategories = categories.value
  if (currentCategories.includes(category)) {
    categories.value = currentCategories.filter((item) => item !== category)
  } else {
    categories.value = [...currentCategories, category]
  }
  router.push({ path: route.path, query: { ...query, category: categories.value.join(',') } })
}

const handleAddYear = (year: number) => {
  const query = route.query
  router.push({ path: route.path, query: { ...query, year } })
}

watchEffect(() => {
  if (route.query.category) {
    categories.value = route.query.category.toString().split(',')
  }
})
</script>

<template>
  <section>
    <div class="flex gap-4 flex-wrap">
      <Button @click="handleOpenFilterCategory" class="flex items-center">
        <ListFilter /> Lọc Theo Thể Loại
      </Button>
      <Button @click="handleOpenFilterYear" class="flex items-center">
        <ListFilter /> Lọc Theo Năm
      </Button>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <div v-if="isShowFilterCategory" class="w-full flex flex-wrap gap-1">
        <Button
          v-for="category in data?.items"
          :key="category._id"
          class="cursor-pointer px-2 py-1 border"
          @click="handleAddCategory(category.slug)"
          :variant="categories.includes(category.slug) ? 'destructive' : 'outline'"
        >
          {{ category.name }}
        </Button>
      </div>
      <hr v-if="isShowFilterCategory || isShowFilterYear" />
      <div v-if="isShowFilterYear" class="w-full flex flex-wrap gap-1">
        <Button
          v-for="i in years"
          :key="i"
          class="cursor-pointer px-4 py-1 border"
          @click="handleAddYear(i)"
          :variant="i === Number(route.query.year) ? 'destructive' : 'outline'"
        >
          {{ i }}
        </Button>
      </div>
    </div>
  </section>
</template>
