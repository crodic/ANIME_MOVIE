<script setup lang="ts">
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-vue-next'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieBookmark } from '@/stores/movieBookmark'

interface Episode {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

const router = useRouter()
const route = useRoute()

const bookmarkStore = useMovieBookmark()

const currentSlug = computed(() => route.params.slug.toString().split('-').slice(0, -1))

const props = defineProps<{
  episodes: Episode[]
  currentEpisode: string
}>()

const isHasPrev = computed(() => {
  return props.episodes.findIndex((episode) => episode.slug === props.currentEpisode) > 0
})

const isHasNext = computed(() => {
  return (
    props.episodes.findIndex((episode) => episode.slug === props.currentEpisode) <
    props.episodes.length - 1
  )
})

const handleClickPrev = () => {
  const index = props.episodes.findIndex((episode) => episode.slug === props.currentEpisode)
  if (index > 0) {
    router.push({
      name: 'watch-movie',
      params: {
        slug: `${currentSlug.value.join('-')}-${props.episodes[index - 1].slug}`,
      },
    })
  }
}

const handleClickNext = () => {
  const index = props.episodes.findIndex((episode) => episode.slug === props.currentEpisode)
  if (index < props.episodes.length - 1) {
    router.push({
      name: 'watch-movie',
      params: { slug: `${currentSlug.value.join('-')}-${props.episodes[index + 1].slug}` },
    })
  }
}
</script>

<template>
  <section>
    <Card class="rounded-none">
      <CardContent class="mt-6 flex justify-center gap-4">
        <Button :disabled="!isHasPrev" @click="handleClickPrev" size="sm"
          ><ArrowLeft />Trước
        </Button>
        <Button size="sm" @click="bookmarkStore.addBookmark(currentSlug.slice(0, -1).join('-'))">
          <Bookmark
            :fill="
              bookmarkStore.bookmarks.includes(currentSlug.slice(0, -1).join('-')) ? 'blue' : 'none'
            "
          />
        </Button>
        <Button :disabled="!isHasNext" @click="handleClickNext" size="sm"
          >Tiếp <ArrowRight
        /></Button>
      </CardContent>
    </Card>
  </section>
</template>
