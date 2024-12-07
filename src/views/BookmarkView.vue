<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getAnimeByBookmarks } from '@/services/api'
import { useMovieBookmark } from '@/stores/movieBookmark'
import { useQueries } from '@tanstack/vue-query'

const bookmarkStore = useMovieBookmark()

const queries = bookmarkStore.bookmarks.map((slug) => ({
  queryKey: ['bookmarks', slug],
  queryFn: () => getAnimeByBookmarks(slug),
  enabled: !!slug,
}))

const results = useQueries({ queries })
</script>
<template>
  <Card class="rounded-none">
    <CardHeader class="p-2 px-4">
      <h1 class="text-base font-bold">Phim Đang Theo Dõi</h1>
    </CardHeader>
  </Card>

  <section class="md:min-h-[550px]">
    <Card>
      <CardContent class="p-4">
        <div
          v-if="!bookmarkStore.bookmarks.length"
          class="min-h-[200px] flex justify-center items-center"
        >
          <p>Chưa có phim nào được theo dõi</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2" v-if="results">
          <template v-for="result in results">
            <MovieCard
              v-if="result.data?.item"
              :key="result.data?.item._id"
              :data="result.data?.item"
            />
          </template>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
