<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import type { MovieData } from '@/types'
import { useRoute, useRouter } from 'vue-router'

defineProps<{ pagination: MovieData['params']['pagination'] | undefined }>()

const route = useRoute()
const router = useRouter()

const handleClick = (page: number) => {
  if (route.path === '/' && page !== 1) {
    router.push({ name: 'search', query: { ...route.query, page } })
  } else {
    router.push({ path: route.path, query: { ...route.query, page } })
  }
}
</script>

<template>
  <Pagination
    v-if="pagination"
    v-slot="{ page }"
    :total="pagination?.totalItems"
    :items-per-page="24"
    :sibling-count="2"
    show-edges
    :default-page="route.query.page ? Number(route.query.page) : 1"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1 flex-wrap">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            @click="handleClick(item.value)"
            class="size-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
