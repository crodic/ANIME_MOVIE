<script setup lang="ts">
import type { MovieData, MovieDetailData } from '@/types'
import LazyImage from './LazyImage.vue'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { useRouter } from 'vue-router'

defineProps<{ data: MovieData['items'][0] | MovieDetailData['item'] }>()

const imgUrl = import.meta.env.VITE_OPHIM_IMG

const router = useRouter()

const handleClick = ({ slug }: { slug: string }) => {
  router.push({ name: 'movie-detail', params: { slug } })
}
</script>
<template>
  <Card
    class="rounded-none border-4 cursor-pointer hover:opacity-80 flex flex-col h-full"
    @click="handleClick({ slug: data.slug })"
    v-if="data"
  >
    <CardHeader class="p-0 relative aspect-auto h-auto flex-1">
      <LazyImage
        :src="imgUrl + '/' + data?.thumb_url"
        :alt="data.origin_name"
        :width="1071"
        :height="1500"
        class="h-full w-full object-top"
      />
      <div
        class="absolute bottom-2 right-2 bg-destructive text-destructive-foreground text-sm px-2"
        v-if="data.tmdb"
      >
        {{ data.tmdb.vote_average.toFixed(1) }}
      </div>
      <div
        class="absolute top-2 left-2 bg-destructive text-destructive-foreground text-sm px-2 shadow-md"
      >
        {{ data.episode_current }}
      </div>
    </CardHeader>
    <CardContent class="p-2">
      <CardDescription>
        <span class="line-clamp-1 font-semibold text-blue-500 text-center">
          {{ data.name }}
        </span>
      </CardDescription>
    </CardContent>
  </Card>
</template>
