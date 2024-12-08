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
import { registerSchema } from '@/schema/auth.schema'
import { RouterLink, useRouter } from 'vue-router'
import { register } from '@/services/api'
import type { z } from 'zod'
import { toast } from '@/components/ui/toast'
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const router = useRouter()
const isLoading = ref(false)

const handleSubmit = async (e: z.infer<typeof registerSchema>) => {
  try {
    isLoading.value = true
    const { email, password, confirmPassword } = e
    await register(email, password, confirmPassword)
    toast({ title: 'Đăng ký thành công', variant: 'success' })
    router.push({ name: 'login' })
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
        <CardTitle>Đăng Ký</CardTitle>
        <CardDescription>Đăng ký để có trải nghiệm tốt hơn</CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="registerSchema"
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
            confirmPassword: {
              label: 'Nhập Lại Mật Khẩu',
              inputProps: {
                type: 'password',
                disabled: isLoading,
              },
            },
          }"
        >
          <Button type="submit" class="mt-4 w-full">
            <span v-if="!isLoading">Đăng Ký</span>
            <span v-else>
              <Loader2 class="size-4 animate-spin" />
            </span>
          </Button>
        </AutoForm>
      </CardContent>
      <Separator class="my-4" label="Hoặc" />
      <CardFooter>
        <Button variant="secondary" class="w-full">
          <RouterLink to="/dang-nhap">Đăng Nhập</RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </section>
</template>
