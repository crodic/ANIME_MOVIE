<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/toast'
import { changePasswordSchema } from '@/schema/auth.schema'
import { changePassword } from '@/services/api'
import type { z } from 'zod'

const handleSubmit = async (e: z.infer<typeof changePasswordSchema>) => {
  const { newPassword, oldPassword, confirmPassword } = e
  try {
    const res = await changePassword(newPassword, oldPassword, confirmPassword)
    toast({ title: res.message, variant: 'success' })
  } catch (error) {
    toast({
      title: (error as Error).message,
      variant: 'destructive',
    })
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
              },
            },
            newPassword: {
              label: 'Mật khẩu mới',
              inputProps: {
                type: 'password',
              },
            },
            confirmPassword: {
              label: 'Nhập lại mật khẩu mới',
              inputProps: {
                type: 'password',
              },
            },
          }"
        >
          <Button type="submit" class="mt-4 w-full">Xác Nhận</Button>
        </AutoForm>
      </CardContent>
    </Card>
  </section>
</template>
