<script setup lang="ts">
import AnimeList from '@/components/AnimeList.vue'
import NewMovieUpdate from '@/components/NewMovieUpdate.vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useHead, useSeoMeta } from '@unhead/vue'

useHead({
  title: 'Animazing - Trang chủ',
  meta: [{ name: 'description', content: 'Website xem anime trực tuyến Animazing' }],
})

useSeoMeta({
  ogTitle: 'Animazing - Trang chủ',
  ogDescription: 'Website xem anime trực tuyến Animazing',
  ogUrl: 'https://anime-movie-tan.vercel.app/',
  ogImageUrl: 'https://images4.alphacoders.com/907/907594.png',
  ogImage: 'https://images4.alphacoders.com/907/907594.png',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <section aria-label="Alerts" class="space-y-2 px-4 md:px-0">
      <Alert
        variant="destructive"
        class="bg-destructive text-destructive-foreground py-2 flex items-center"
      >
        <AlertDescription>
          <p class="text-sm md:text-base drop-shadow-md">
            Nghiêm cấm bàn về các vấn đề chính trị của trong và ngoài nước (dù cho tốt hay xấu), sẽ
            bị ban acc vĩnh viễn.
          </p>
        </AlertDescription>
      </Alert>
    </section>
    <NewMovieUpdate />
    <AnimeList />
  </div>
</template>
