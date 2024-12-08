<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/toast'
import { changePasswordSchema } from '@/schema/auth.schema'
import { changePassword } from '@/services/api'
import { useSessionStore } from '@/stores/session'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { z } from 'zod'

const router = useRouter()
const sessionStore = useSessionStore()
const isLoading = ref(false)

const handleSubmit = async (e: z.infer<typeof changePasswordSchema>) => {
  const { newPassword, oldPassword, confirmPassword } = e
  try {
    isLoading.value = true
    await changePassword(newPassword, oldPassword, confirmPassword)
    toast({ title: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại', variant: 'success' })
    sessionStore.userLogout()
    router.push({ name: 'login' })
  } catch (error) {
    toast({
      title: 'Lỗi!!!. Vui lòng kiểm tra lai mật khẩu',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <section class="min-h-[500px] flex justify-center items-center">
    <Card class="w-[400px] max-w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Đổi Mật Khẩu</CardTitle>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="changePasswordSchema"
          @submit="handleSubmit"
          :field-config="{
            oldPassword: {
              label: 'Mật khẩu hiện tại',
              inputProps: {
                placeholder: '*******',
                type: 'password',
                disabled: isLoading,
              },
            },
            newPassword: {
              label: 'Mật khẩu mới',
              inputProps: {
                type: 'password',
                disabled: isLoading,
                placeholder: '*******',
              },
            },
            confirmPassword: {
              label: 'Nhập lại mật khẩu mới',
              inputProps: {
                type: 'password',
                disabled: isLoading,
                placeholder: '*******',
              },
            },
          }"
        >
          <Button type="submit" class="mt-4 w-full">
            <span v-if="!isLoading">Xác Nhận</span>
            <span v-else>
              <Loader2 class="size-4 animate-spin" />
            </span>
          </Button>
        </AutoForm>
      </CardContent>
    </Card>
  </section>
</template>
