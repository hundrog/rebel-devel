<script lang="ts" setup>
const articleStore = useArticlesStore()
const route = useRoute();
const content = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>')

async function saveBody() {
  console.log(content.value)

  await articleStore.updateArticle(articleStore.article.id.toString(), { content: content.value })

  if (articleStore.errors) {
    console.log(articleStore.errors)
    articleStore.clearErrors()
  } else {
    content.value = articleStore.article.content
  }
}

onMounted(async () => {
  if (route.query.id) {
    await articleStore.fetchSingle(route.query.id.toString())

    content.value = articleStore.article.content
  } else {
    console.log('Article not found')
  }
})
</script>

<template>
  <div class="flex flex-row justify-between mb-16">
    <TitleField />
  </div>

  <EditorEmitor v-model="content" />
  <div class="flex justify-end my-4">
    <button class="btn btn-primary" @click="saveBody">Save Article</button>
  </div>
  <pre><code>{{ content }}</code></pre>
</template>

<style scoped>
</style>
