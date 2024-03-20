<script lang="ts" setup></script>

<template>
  <div class="bg-base-100 navbar">
    <NuxtLink to="/" class="text-xl btn btn-ghost">R/D</NuxtLink>
  </div>
  <div class="mx-auto container">
    Layout: default
    <slot />
  </div>
</template>

<style scoped>
</style>
