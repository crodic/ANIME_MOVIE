<script setup lang="ts">
import Footer from '@/components/layouts/Footer.vue'
import Header from '@/components/layouts/Header.vue'
import { Toaster } from '@/components/ui/toast'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="w-full max-w-5xl mx-auto flex flex-col gap-4 px-2">
    <Header></Header>
    <RouterView />
    <Toaster />
    <Footer></Footer>
  </main>
</template>
