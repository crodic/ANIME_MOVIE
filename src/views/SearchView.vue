<script setup lang="ts">
import AdvancedFilter from '@/components/AdvancedFilter.vue'
import AnimeList from '@/components/AnimeList.vue'
import { Card, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const q = route.query.q || ''
const page = route.query.page || '1'

useHead({
  title: `Kết quả tìm kiếm cho từ khoá "${q}" - Trang ${page}`,
})
</script>
<template>
  <Card class="rounded-none">
    <CardHeader class="p-2 px-4">
      <h1 class="text-base font-bold">
        {{ route.query.q ? 'Kết quả tìm kiếm cho #' + route.query.q + '' : 'Lọc Phim' }} - Trang
        {{ route.query.page || '1' }}
      </h1>
    </CardHeader>
  </Card>

  <AdvancedFilter />
  <AnimeList />
</template>
