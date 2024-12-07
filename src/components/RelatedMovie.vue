<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Card, CardHeader } from './ui/card'
import { getAnimeList } from '@/services/api'
import MovieCard from './MovieCard.vue'

const props = defineProps<{
  category: {
    id: string
    name: string
    slug: string
  }[]
}>()

const { data } = useQuery({
  queryKey: ['movies', { page: '1', category: props.category }],
  queryFn: () => getAnimeList({ page: '1', category: props.category.map((item) => item.slug) }),
})
</script>
<template>
  <section class="md:px-0 px-4">
    <Card class="rounded-none">
      <CardHeader class="p-2 px-4">
        <RouterLink
          :to="{
            name: 'search',
            query: { category: props.category.map((item) => item.slug).join(',') },
          }"
          class="text-base font-semibold"
          >Anime Liên Quan</RouterLink
        >
      </CardHeader>
    </Card>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
      <div v-for="movie in data?.items.slice(0, 10)" :key="movie._id">
        <MovieCard :data="movie" />
      </div>
    </div>
  </section>
</template>
