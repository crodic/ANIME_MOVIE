<script setup lang="ts">
import type { CommentData } from '@/types'
import Comment from './Comment.vue'
import { Button } from './ui/button'

defineProps<{ comments: CommentData[] }>()
</script>
<template>
  <section class="flex flex-col gap-4">
    <Comment v-for="comment in comments" :key="comment._id" :data="comment" />
  </section>
  <div class="flex justify-center items-center" v-if="comments.length > 10">
    <Button>Tải Thêm Bình Luận</Button>
  </div>
</template>
