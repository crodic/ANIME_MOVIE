<script setup lang="ts">
import { getAnimeList } from '@/services/api'
import { useQuery } from '@tanstack/vue-query'
import { Card } from './ui/card'
import CardHeader from './ui/card/CardHeader.vue'
import { cn } from '@/lib/utils'

const { data } = useQuery({
  queryKey: ['movies', { page: '1' }],
  queryFn: () => getAnimeList({ page: '1' }),
})
</script>

<template>
  <section>
    <Card class="rounded-none">
      <CardHeader class="p-2 px-4">
        <h4 class="text-base font-semibold">Anime mới cập nhật</h4>
      </CardHeader>
    </Card>
    <ul class="border border-t-0 px-4 list-none">
      <li
        class="p-1 relative pl-6 md:text-base text-sm"
        v-for="(movie, index) in data?.items.slice(0, 10)"
        :key="movie._id"
      >
        <span
          :class="
            cn(
              `absolute left-0 top-[50%] translate-y-[-50%] text-xl`,
              index === 0
                ? 'text-blue-500'
                : index === 1
                  ? 'text-yellow-500'
                  : index === 2
                    ? 'text-red-500'
                    : '',
            )
          "
          >•</span
        >
        <RouterLink
          :to="{ name: 'movie-detail', params: { slug: `${movie.slug}` } }"
          :class="
            cn('hover:text-blue-500 flex items-center justify-between gap-4', {
              'opacity-50': !movie,
            })
          "
        >
          <span>
            {{ movie.name }}
          </span>
          <span class="min-w-[100px] text-end">
            {{ movie.episode_current }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
