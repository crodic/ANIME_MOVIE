<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/toast'
import { loginSchema } from '@/schema/auth.schema'
import { login } from '@/services/api'
import { useSessionStore } from '@/stores/session'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { z } from 'zod'

const router = useRouter()
const sessionStore = useSessionStore()
const isLoading = ref(false)

const handleSubmit = async (e: z.infer<typeof loginSchema>) => {
  try {
    isLoading.value = true
    const { email, password } = e
    const res = await login(email, password)
    sessionStore.userLogin(res.payload)
    toast({ title: 'Đăng nhập thành công', variant: 'success' })
    router.push({ name: 'home' })
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: 'destructive' })
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <section class="min-h-[500px] flex justify-center items-center">
    <Card class="w-[400px] max-w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Đăng Nhập</CardTitle>
        <CardDescription>Đăng nhập để có trải nghiệm tốt hơn</CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="loginSchema"
          @submit="handleSubmit"
          :field-config="{
            email: {
              label: 'Email',
              inputProps: {
                placeholder: 'abc@gmail.com',
                disabled: isLoading,
              },
            },
            password: {
              label: 'Mật khẩu',
              inputProps: {
                type: 'password',
                disabled: isLoading,
              },
            },
          }"
        >
          <Button type="submit" class="mt-4 w-full" :disabled="isLoading">
            <span v-if="!isLoading">Đăng Nhập</span>
            <span v-else>
              <Loader2 class="size-4 animate-spin" />
            </span>
          </Button>
        </AutoForm>
      </CardContent>
      <Separator class="my-4" label="Hoặc" />
      <CardFooter>
        <Button variant="secondary" class="w-full">
          <RouterLink to="/dang-ky">Đăng Ký</RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </section>
</template>
