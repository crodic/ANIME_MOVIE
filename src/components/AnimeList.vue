<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import MovieCard from './MovieCard.vue'
import { Card, CardHeader } from './ui/card'
import { getSearchAnimeList } from '@/services/api'
import Paginate from './Paginate.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription } from './ui/alert'

const route = useRoute()

const currentPage = computed(() => route.query.page || '1')
const categories = computed(() => route.query.category?.toString().split(',') || [])
const year = computed(() => route.query.year || '')
const keyword = computed(() => route.query.q || '')

const { data, error, isPending, refetch } = useQuery({
  queryKey: ['movies', { currentPage, categories, year, keyword }],
  queryFn: () =>
    getSearchAnimeList({
      page: currentPage.value.toString(),
      category: categories.value,
      year: year.value.toString(),
      keyword: keyword.value.toString(),
    }),
})

watch(
  () => route.query.page,
  (newPage, oldPage) => {
    if (newPage !== oldPage) {
      refetch()
    }
  },
)
</script>

<template>
  <section v-if="!isPending && !data?.items.length">
    <div class="min-h-[400px]">
      <p class="text-red-500">Không tìm thấy anime.</p>
    </div>
  </section>
  <section v-else class="min-h-screen">
    <Card class="rounded-none">
      <CardHeader class="p-2 px-4">
        <h4 class="text-base font-semibold">Danh sách Anime</h4>
      </CardHeader>
    </Card>
    <!-- Skeleton List -->
    <div v-if="isPending" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
      <div v-for="i in 24" :key="i">
        <Skeleton class="h-[244px] md:h-[294px]" />
      </div>
    </div>
    <div v-else-if="error">
      <Alert variant="destructive">
        <AlertDescription>{{ error.message }}</AlertDescription>
      </Alert>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
      <p
        v-if="!data?.items.length"
        class="lg:col-span-5 md:col-span-3 col-span-2 lg:row-span-5 md:row-span-3 row-span-2 flex justify-center items-center text-center text-destructive font-semibold py-4 h-64"
      >
        Không tìm thấy phim.
      </p>
      <div v-for="movie in data?.items" :key="movie._id">
        <MovieCard :data="movie" />
      </div>
    </div>
    <!-- Skeleton List -->
    <Skeleton v-if="isPending" class="h-[50px] w-full mt-4" />
    <div class="flex justify-center mt-4" v-else>
      <Paginate :pagination="data?.params.pagination" />
    </div>
  </section>
</template>
