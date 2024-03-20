<script lang="ts" setup>
const avatar_path = ref('')
const route = useRoute();

watch(route, ()=>{
  if (route.query) {
    console.log(route.query)
    // Will download article content in the future
  }
}, {immediate: true})
</script>

<template>
  <div class="flex flex-row justify-between mb-16">
    <TitleField />
    <UploadImage v-model:path="avatar_path" />
  </div>
  <TipTap />
</template>

<style scoped>
</style>
