<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import TailwindHeadings from './extensions/TailwindHeadings'
import { TailwindCode, TailwindUnderline, TailwindCodeBlock } from './extensions/TailwindMarks';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])
const avatar_path = ref('')

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false,
      code: false,
      codeBlock: false
    }),
    Document,
    Image,
    Dropcursor,
    Paragraph,
    Text,
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

watch(avatar_path, () => {
  if (avatar_path.value) {
    const supabase = useSupabaseClient()
    const { data } = supabase
      .storage
      .from('images')
      .getPublicUrl(avatar_path.value)

    if (data.publicUrl) {
      const url = data.publicUrl
      editor.value?.chain().focus().setImage({ src: url }).run()
    }
  }
})
</script>

<template>
  <UploadImage v-model:path="avatar_path" />
  <editor-content :editor="editor" />
</template>

<style scoped>
</style>
