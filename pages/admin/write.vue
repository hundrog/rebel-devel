<script lang="ts" setup>
const avatar_path = ref('')
const route = useRoute();
const content = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>')

watch(() => route.query, (newId, oldId) => {
  // react to route changes...
  console.log('New id received: ', newId)
})
</script>

<template>
  <div class="flex flex-row justify-between mb-16">
    <TitleField />
    <UploadImage v-model:path="avatar_path" />
  </div>
  <EditorEmitor v-model="content" />

  <pre><code>{{ content }}</code></pre>
</template>

<style scoped>
</style>
