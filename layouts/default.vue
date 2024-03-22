<script lang="ts" setup>
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
</script>

<template>
  <div class="flex flex-col items-end min-h-screen">
  <NavBar />
  <div class="mx-auto container grow">
    <slot />
  </div>
  <Footer />
</div>
</template>

<style scoped>
</style>
