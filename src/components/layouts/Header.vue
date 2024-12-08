<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
import CategoryDropdown from '../CategoryDropdown.vue'
import MobileSearch from '../MobileSearch.vue'
import SearchInput from '../SearchInput.vue'
import ToggleMode from '../ToggleMode.vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Button from '../ui/button/Button.vue'
import { BookmarkIcon, LogInIcon, UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import UserDropdown from '../UserDropdown.vue'

const store = useGlobalStore()
const sessionStore = useSessionStore()
const router = useRouter()

const isMobileSearchOpen = computed(() => store.isShowMobileSearch)
</script>
<template>
  <header class="flex justify-between items-center border-b px-4 py-2 h-[80px]">
    <p :class="cn(isMobileSearchOpen && 'flex-1')">
      <RouterLink to="/" class="dancing-script-700 text-blue-500" v-if="!isMobileSearchOpen"
        >Animazing</RouterLink
      >
    </p>
    <SearchInput />
    <div class="flex gap-2 items-center">
      <MobileSearch />
      <Button size="icon" @click="router.push({ name: 'bookmark' })">
        <BookmarkIcon />
        <span class="sr-only">Đánh dấu</span>
      </Button>
      <Button
        size="icon"
        @click="router.push({ name: 'login' })"
        v-if="!sessionStore.isAuthenticated"
      >
        <LogInIcon />
        <span class="sr-only">Đăng nhập</span>
      </Button>
      <UserDropdown v-else />
      <CategoryDropdown />
      <ToggleMode />
    </div>
  </header>
</template>
