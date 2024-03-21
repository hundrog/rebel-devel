<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TailwindHeadings from './extensions/TailwindHeadings';

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit.configure({
      heading: false,
      code: false,
    }),
    TailwindHeadings
  ],
  editorProps: {
    attributes: {
      class: 'textarea textarea-bordered textarea-lg'
    }
  }
})

function myEvent() {
  console.log(editor.value?.getHTML())
}
</script>

<template>
  <div class="flex flex-col space-y-4">
    <editor-content :editor="editor" />
    <div class="flex justify-end">
      <button class="btn-block max-w-xs btn btn-primary" @click="myEvent()">Save Article</button>
    </div>
  </div>
</template>

<style scoped>
</style>
