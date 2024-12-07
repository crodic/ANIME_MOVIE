<script setup lang="ts">
import Episodes from '@/components/Episodes.vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getMovieDetail } from '@/services/api'
import { useMovieHistory } from '@/stores/movieHistory'
import type { DataHistory } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import { useHead } from '@unhead/vue'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const historyStore = useMovieHistory()

const slug = computed(() => route.params.slug.toString().split('-').slice(0, -2).join('-'))
const fullEpisodeSlug = computed(() => {
  const slugParts = route.params.slug?.toString().split('-') || []
  const lastTwoParts = slugParts.slice(-2)
  if (lastTwoParts.includes('Full')) {
    return 'Full'
  }
  if (slugParts.includes('tap')) {
    return lastTwoParts[1]
  }
  return lastTwoParts.join('-')
})

const { data, isError, error, isPending } = useQuery({
  queryKey: ['movie', slug],
  queryFn: () => getMovieDetail(slug.value.toString()),
  enabled: slug.value !== '',
})

const serverName = ref('')

const handleChangeServer = (server: string) => {
  serverName.value = server
}

watchEffect(() => {
  if (data.value) {
    serverName.value = data.value?.item.episodes[0].server_name
  }
})

const server = computed(() => {
  return (
    data.value?.item.episodes.find((item) => item.server_name === serverName.value) ||
    data.value?.item.episodes[0]
  )
})

watchEffect(() => {
  if (data.value) {
    const history: DataHistory = {
      movie_id: data.value.item._id,
      slug: data.value.item.slug,
      episode_slug: fullEpisodeSlug.value,
    }
    historyStore.addHistory(history)
  }
})

useHead({
  title: () => `${data.value?.item.name || 'Xem Phim'} - Tập ${fullEpisodeSlug.value}`,
})

watchEffect(() => {
  if (isError.value || error.value) {
    router.push({ name: 'not-found' })
  }
})
</script>
<template>
  <div v-if="isPending" class="space-y-4">
    <Skeleton class="h-[50px]" />
    <Skeleton class="h-[50px]" />
    <Skeleton class="w-full aspect-video" />
    <Skeleton class="h-[100px]" />
  </div>

  <Card class="rounded-none" v-if="data">
    <CardHeader class="p-2 px-4">
      <h1 class="text-base font-bold text-center">
        {{ data.item.name }} - Tập {{ fullEpisodeSlug.split('-').reverse()[0] }}
      </h1>
    </CardHeader>
  </Card>
  <div>
    <Button
      :variant="server.server_name === serverName ? 'default' : 'outline'"
      v-for="server in data?.item.episodes"
      :key="server.server_name"
      @click="handleChangeServer(server.server_name)"
    >
      {{ server.server_name }}
    </Button>
  </div>
  <iframe
    v-if="server"
    :src="server.server_data.find((item) => item.slug === fullEpisodeSlug)?.link_embed"
    frameborder="0"
    allowfullscreen
    class="w-full aspect-video"
  ></iframe>

  <section>
    <Episodes v-if="data" :data="data" :full-slug-episode="fullEpisodeSlug" />
  </section>
</template>
