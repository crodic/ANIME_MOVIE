<script setup lang="ts">
import type { MovieData } from '@/types'
import LazyImage from './LazyImage.vue'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { useRouter } from 'vue-router'

defineProps<{ data: MovieData['items'][0] }>()

const imgUrl = import.meta.env.VITE_OPHIM_IMG

const router = useRouter()

const handleClick = ({ slug }: { slug: string }) => {
  router.push({ name: 'movie-detail', params: { slug } })
}
</script>
<template>
  <Card
    class="rounded-none border-4 cursor-pointer hover:opacity-80"
    @click="handleClick({ slug: data.slug })"
  >
    <CardHeader class="p-0 h-[300px] md:h-[250px]">
      <LazyImage
        :src="imgUrl + '/' + data.thumb_url"
        :alt="data.origin_name"
        class="h-full object-top"
      />
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
