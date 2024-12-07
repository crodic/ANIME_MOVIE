<script setup lang="ts">
import AnimeList from '@/components/AnimeList.vue'
import NewMovieUpdate from '@/components/NewMovieUpdate.vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Animazing - Trang chủ',
  meta: [
    { name: 'description', content: 'Website xem anime trực tuyến Animazing' },
    { name: 'og:title', content: 'Animazing - Trang chủ' },
    { name: 'og:url', content: 'https://anime-movie-tan.vercel.app/' },
    {
      name: 'og:image',
      content:
        'https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf',
    },
    {
      name: 'og:description',
      content: 'Website xem anime trực tuyến Animazing',
    },
  ],
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Alert variant="destructive" class="bg-destructive text-destructive-foreground">
      <AlertCircle class="w-4 h-4 text-destructive-foreground" color="white" />
      <AlertDescription>
        <p class="text-sm md:text-base">
          Nghiêm cấm bàn về các vấn đề chính trị của trong và ngoài nước (dù cho tốt hay xấu), sẽ bị
          ban acc vĩnh viễn.
        </p>
      </AlertDescription>
    </Alert>
    <NewMovieUpdate />
    <AnimeList />
  </div>
</template>
