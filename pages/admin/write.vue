<script lang="ts" setup>
const content = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>')
</script>

<template>
  <div class="flex flex-row justify-between mb-16">
    <TitleField />
  </div>

  <EditorEmitor v-model="content" />

  <pre><code>{{ content }}</code></pre>
</template>

<style scoped>
</style>
