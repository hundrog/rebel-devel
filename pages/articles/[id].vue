<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const articleStore = useArticlesStore()

onMounted(async () => {
  await articleStore.fetchSinglePublished(route.params.id.toString())

  if (!articleStore.article) {
    console.log("No existe")
    return navigateTo("/")
  }
})
</script>

<template>
  <div v-if="articleStore.article">
    <h1 class="font-bold text-3xl">
      {{ articleStore.article.title }}
    </h1>

    <div v-html="articleStore.article.content"></div>
  </div>
</template>

<style scoped>
</style>
