<script setup lang="ts">
import type { MovieDetailData } from '@/types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useRouter } from 'vue-router'
import { useMovieHistory } from '@/stores/movieHistory'

defineProps<{ data: MovieDetailData; fullSlugEpisode?: string }>()
const storeHistory = useMovieHistory()

const router = useRouter()

const extraSlug = ['phan', 'tap']

const handleClickWatch = ({ slug, episode }: { slug: string; episode: string }) => {
  router.push({
    name: 'watch-movie',
    params: {
      slug: extraSlug.includes(episode.split('-')[0])
        ? `${slug}-${episode}`
        : `${slug}-tap-${episode}`,
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader class="p-4">
      <CardTitle class="text-lg"> Danh Sách Tập </CardTitle>
    </CardHeader>
    <CardContent class="max-h-[500px] overflow-y-auto">
      <div
        class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4"
      >
        <Button
          class=""
          v-for="(episode, index) in data?.item.episodes[0].server_data"
          :key="episode.slug"
          @click="
            handleClickWatch({
              slug: data?.item.slug || '',
              episode: episode.slug || (index + 1).toString(),
            })
          "
          :variant="
            fullSlugEpisode && episode.slug === fullSlugEpisode
              ? 'default'
              : storeHistory.data.find(
                    (item) =>
                      item.episode_slug === episode.slug &&
                      item.slug === data?.item.slug &&
                      item.episode_slug !== fullSlugEpisode,
                  )
                ? 'outline'
                : 'secondary'
          "
          >{{ episode.name === 'undefined' ? (index + 1).toString() : episode.name }}</Button
        >
      </div>
    </CardContent>
  </Card>
</template>
