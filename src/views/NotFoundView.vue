<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center p-4"
  >
    <Card class="w-full max-w-md bg-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-white"
          >Oops! Trang Không Tồn Tại</CardTitle
        >
        <CardDescription class="text-center text-gray-300">
          Có vẻ như trang này đã bị lạc trong đa vũ trụ anime!
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="w-64 h-64 mb-6 relative">
          <img
            src="https://static.vecteezy.com/system/resources/previews/015/274/469/non_2x/hand-drawn-404-error-illustration-page-vector.jpg"
            alt="Confused anime character"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <p class="text-lg text-center text-white mb-6">
          "Ngay cả những anh hùng anime vĩ đại nhất đôi khi cũng lạc đường. Nhưng đừng lo, cuộc
          phiêu lưu của bạn vẫn chưa kết thúc đâu!"
        </p>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button @click="goHome" variant="secondary" class="w-full sm:w-auto">
          <HomeIcon class="mr-2 h-4 w-4" />
          Trở Về Trang Chủ
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
