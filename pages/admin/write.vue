<script lang="ts" setup>
const avatar_path = ref('')
</script>

<template>
  <div class="text-2xl">
    Page: articles/write
  </div>
  <UploadImage v-model:path="avatar_path" />
  <h3 class="text-3xl">Editor</h3>
  <TipTap />
</template>

<style scoped></style>
