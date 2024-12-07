<template>
  <img class="object-cover aspect-auto" :src="src" :alt="alt" loading="lazy" v-bind="$attrs" />
</template>

<script setup lang="ts">
defineProps<{ src: string; alt?: string }>()
</script>
