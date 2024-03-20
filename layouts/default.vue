<script lang="ts" setup>
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
</script>

<template class="min-h-screen">
  <NavBar />
  <div class="mx-auto container">
    <slot />
  </div>
  <Footer />
</template>

<style scoped>
</style>
