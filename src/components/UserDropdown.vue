<script setup lang="ts">
import { UserIcon } from 'lucide-vue-next'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

const handleLogout = () => {
  sessionStore.userLogout()
  router.push({ name: 'login' })
}
</script>

<template>
  <DropdownMenu v-bind="$attrs">
    <DropdownMenuTrigger as-child>
      <Button size="icon">
        <UserIcon />
        <span class="sr-only">Tài khoản</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="router.push({ name: 'change-password' })"
        >Đổi Mật Khẩu</DropdownMenuItem
      >
      <DropdownMenuItem @click="handleLogout" class="cursor-pointer">Đăng Xuất</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
