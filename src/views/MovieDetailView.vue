<script setup lang="ts">
import Episodes from '@/components/Episodes.vue'
import LazyImage from '@/components/LazyImage.vue'
import RelatedMovie from '@/components/RelatedMovie.vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCommentByAnimeId, getMovieDetail } from '@/services/api'
import { useQuery } from '@tanstack/vue-query'
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { Skeleton } from '@/components/ui/skeleton'
import { BookmarkIcon } from 'lucide-vue-next'
import { useMovieBookmark } from '@/stores/movieBookmark'
import { cn } from '@/lib/utils'
import Comments from '@/components/Comments.vue'
import CommentInput from '@/components/CommentInput.vue'

const route = useRoute()
const router = useRouter()

const bookmarkStore = useMovieBookmark()

const slug = computed(() => route.params.slug || '')
const imgUrl = import.meta.env.VITE_OPHIM_IMG

const { data, isError, error, isPending } = useQuery({
  queryKey: ['movie', slug],
  queryFn: () => getMovieDetail(slug.value.toString()),
  enabled: slug.value !== '',
})

const { data: comments } = useQuery({
  queryKey: ['comments', data.value?.item._id.toString()],
  queryFn: () => getCommentByAnimeId({ animeId: data.value?.item._id.toString() || '' }),
  enabled: data.value?.item._id.toString() !== '',
})

useHead({
  title: () => `${data.value?.item.name || 'Thông tin phim'}`,
  meta: [{ name: 'description', content: 'Website xem anime trực tuyến Animazing' }],
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
    <Skeleton class="w-full h-[250px]" />
    <Skeleton class="h-[150px]" />
    <Skeleton class="h-[100px]" />
    <Skeleton class="h-[100px]" />
  </div>

  <Card class="rounded-none" v-if="data">
    <CardHeader class="p-2 px-4">
      <h1 class="text-base font-bold text-center">
        <BookmarkIcon
          :class="
            cn(
              `inline-block cursor-pointer`,
              bookmarkStore.bookmarks.includes(data.item.slug) && 'fill-blue-500',
            )
          "
          @click="bookmarkStore.addBookmark(data.item.slug)"
        />
        {{ data?.item.name }}
      </h1>
    </CardHeader>
  </Card>

  <Card class="rounded-none relative" v-if="data">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <CardContent
      class="pt-6 bg-center bg-cover flex gap-4 md:flex-row flex-col items-center justify-center"
      :style="{ backgroundImage: `url(${imgUrl}/${data?.item.poster_url})` }"
    >
      <LazyImage
        :src="imgUrl + '/' + data?.item.thumb_url || ''"
        :alt="data?.item.origin_name"
        :width="600"
        :height="900"
        class="w-[200px] aspect-auto border-4 relative z-10"
      />

      <div
        class="relative z-10 space-y-4 drop-shadow-lg text-white md:text-base text-sm flex-1 w-full"
      >
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Thể loại: </span>
          <div class="flex gap-2 flex-wrap">
            <Badge
              class="rounded-none cursor-pointer"
              variant="secondary"
              v-for="category in data?.item.category"
              :key="category.id"
              >{{ category.name }}</Badge
            >
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Trạng Thái: </span>
          <span>{{ data?.item.status === 'ongoing' ? 'Đang Tiến Hành' : 'Hoàn Thành' }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Lượt Xem: </span>
          <span>{{ data?.item.view || 0 }} lượt xem</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Năm Phát Hành: </span>
          <span>{{ data?.item.year }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Thời Lượng: </span>
          <span
            >{{ data?.item.episode_total }}
            {{ data?.item.episode_total.includes('tập') ? '' : 'tập' }}</span
          >
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-semibold">Ngôn Ngữ: </span>
          <span>{{ data?.item.lang }}</span>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card v-if="data">
    <CardHeader class="p-4">
      <CardTitle>
        <h6 class="text-lg">Nội Dung Chính</h6>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div v-html="data?.item.content"></div>
    </CardContent>
  </Card>

  <section>
    <Episodes v-if="data" :data="data" />
  </section>

  <div class="space-y-2">
    <Card class="rounded-none">
      <CardHeader class="p-2 px-4">
        <h4 class="text-lg font-semibold">Bình Luận</h4>
      </CardHeader>
    </Card>
    <CommentInput v-if="data" :slug="slug.toString()" :anime-id="data.item._id" />
    <Comments v-if="comments" :comments="comments?.payload" />
  </div>

  <RelatedMovie v-if="data" :category="data.item.category" />
</template>
