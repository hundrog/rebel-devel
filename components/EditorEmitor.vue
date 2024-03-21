<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import TailwindHeadings from './extensions/TailwindHeadings'
import { TailwindCode, TailwindUnderline, TailwindCodeBlock } from './extensions/TailwindMarks';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false,
      code: false,
      codeBlock: false
    }),
    TailwindHeadings,
    TailwindUnderline,
    TailwindCode,
    TailwindCodeBlock,
  ],
  content: modelValue.value,
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'textarea textarea-bordered textarea-lg'
    }
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(modelValue, (newValue: string, oldValue: string) => {
  if (newValue === editor.value?.getHTML()) { return }

  editor.value?.commands.setContent(newValue, false)
})
</script>

<template>
  <editor-content :editor="editor" />
</template>

<style scoped>
</style>
