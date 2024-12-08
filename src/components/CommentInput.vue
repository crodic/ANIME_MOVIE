<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createComment } from '@/services/api'
import { toast } from './ui/toast'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{ slug: string; animeId: string }>()
const sessionStore = useSessionStore()

const commentValue = ref('')
const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationFn: createComment,
})

const handleCreateComment = () => {
  mutate(
    { content: commentValue.value, animeId: props.animeId, animeSlug: props.slug },
    {
      onSuccess: () => {
        commentValue.value = ''
        queryClient.invalidateQueries({ queryKey: ['comments', props.slug] })
        toast({
          title: 'Bình luận thành công',
        })
      },
      onError: () => {
        toast({
          title: 'Lỗi',
          variant: 'destructive',
        })
      },
    },
  )
}
</script>

<template>
  <div class="space-y-2" v-if="sessionStore.isAuthenticated">
    <Textarea placeholder="Cảm nghĩ của bạn." v-model="commentValue" />
    <Button @click="handleCreateComment">Bình Luận</Button>
  </div>
</template>
