<script lang="ts" setup>
const articleStore = useArticlesStore()
const articles = ref()

onMounted(async ()=>{
  await articleStore.fetchPublished()

  articles.value = articleStore.published
})
</script>

<template>
  <div class="space-y-4">
  <div class="card lg:card-side bg-base-100 shadow-xl" v-for="article in articles" :key="article.id">
    <div class="card-body">
      <h2 class="card-title">{{ article.title }}</h2>
      <p><span class="sm text">Written at: </span>{{ article.created_at }}</p>
      <div class="justify-end card-actions">
        <NuxtLink :to="`/articles/${article.id}`" class="btn btn-primary">Read</NuxtLink>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>
