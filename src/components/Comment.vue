<script setup lang="ts">
import type { CommentData } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent } from './ui/card'

defineProps<{ data: CommentData }>()
</script>

<template>
  <Card class="p-2">
    <CardContent class="p-2 flex gap-6">
      <div class="flex-shrink-1">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@anime" />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
      </div>
      <div class="flex-1">
        <p class="text-base text-muted-foreground pb-2">{{ data.user.username }}</p>
        <hr />
        <p class="pt-2">
          {{ data.content }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
