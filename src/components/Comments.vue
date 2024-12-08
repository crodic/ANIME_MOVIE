<script setup lang="ts">
import type { CommentData } from '@/types'
import Comment from './Comment.vue'

defineProps<{ comments: CommentData[] }>()
</script>
<template>
  <section class="flex flex-col gap-4">
    <Comment v-for="comment in comments" :key="comment._id" :data="comment" />
  </section>
</template>
