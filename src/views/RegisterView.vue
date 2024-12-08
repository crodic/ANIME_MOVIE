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

const router = useRouter()

const handleSubmit = async (e: z.infer<typeof registerSchema>) => {
  try {
    const { email, password, confirmPassword } = e
    const res = await register(email, password, confirmPassword)
    toast({ title: 'Đăng ký thành công', variant: 'success' })
    router.push({ name: 'login' })
  } catch (error) {
    toast({ title: (error as Error).message, variant: 'destructive' })
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
              },
            },
            password: {
              label: 'Mật khẩu',
              inputProps: {
                type: 'password',
              },
            },
            confirmPassword: {
              label: 'Nhập Lại Mật Khẩu',
              inputProps: {
                type: 'password',
              },
            },
          }"
        >
          <Button type="submit" class="mt-4 w-full">Đăng Ký</Button>
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
