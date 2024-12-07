<script setup lang="ts">
import Footer from '@/components/layouts/Footer.vue'
import Header from '@/components/layouts/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="w-full max-w-5xl mx-auto flex flex-col gap-4">
    <Header></Header>
    <RouterView />
    <Footer></Footer>
  </main>
</template>
