<script setup lang="ts">
import AnimeList from '@/components/AnimeList.vue'
import NewMovieUpdate from '@/components/NewMovieUpdate.vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
import { useHead, useSeoMeta } from '@unhead/vue'

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

useSeoMeta({
  ogTitle: 'Animazing - Trang chủ',
  ogDescription: 'Website xem anime trực tuyến Animazing',
  ogUrl: 'https://anime-movie-tan.vercel.app/',
  ogImageUrl:
    'https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf',
  ogImage:
    'https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <section aria-label="Alerts" class="space-y-2 px-4 md:px-0">
      <Alert variant="destructive" class="bg-destructive text-destructive-foreground">
        <AlertCircle class="w-4 h-4 text-destructive-foreground" color="white" />
        <AlertDescription>
          <p class="text-sm md:text-base">
            Nghiêm cấm bàn về các vấn đề chính trị của trong và ngoài nước (dù cho tốt hay xấu), sẽ
            bị ban acc vĩnh viễn.
          </p>
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" class="bg-destructive text-destructive-foreground">
        <AlertCircle class="w-4 h-4 text-destructive-foreground" color="white" />
        <AlertDescription>
          <p class="text-sm md:text-base">
            Nếu website không tải được hình ảnh, vui lòng truy cập
            <a
              href="https://img.ophim1.com/uploads/movies/fairy-tail-nhiem-vu-100-nam-thumb.jpg"
              target="_blank"
              class="text-blue-500 hover:text-blue-700 hover:underline"
            >
              vào đây</a
            >
            -> chọn "Nâng cao" -> "Tiếp tục truy cập"
          </p>
        </AlertDescription>
      </Alert>
    </section>
    <NewMovieUpdate />
    <AnimeList />
  </div>
</template>
