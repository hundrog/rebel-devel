<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { useEditorSetup } from './editor/useEditorSetup'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])
const imagePath = ref('')

const editor = useEditorSetup(
  modelValue.value,
  (content: string) => {
    emit('update:modelValue', content)
  })


onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(modelValue, (newValue: string, oldValue: string) => {
  if (newValue === editor.value?.getHTML()) { return }

  editor.value?.commands.setContent(newValue, false)
})

watch(imagePath, () => {
  if (imagePath.value) {
    const supabase = useSupabaseClient()
    const { data } = supabase
      .storage
      .from('images')
      .getPublicUrl(imagePath.value)

    if (data.publicUrl) {
      const url = data.publicUrl
      editor.value?.chain().focus().setImage({ src: url }).run()
    }
  }
})
</script>

<template>
  <div class="flex justify-end space-x-2 mb-4">
    <ImageUploader v-model:path="imagePath" />
    <div class="btn btn-outline btn-square"><span class="font-black text-xl">B</span></div>
    <div class="btn btn-outline btn-square"><span class="font-thin text-lg italic">I</span></div>
    <div class="btn btn-outline btn-square"><span class="font-thin text-lg underline">U</span></div>
  </div>
  <editor-content :editor="editor" />
</template>

<style scoped>
</style>
