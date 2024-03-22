<script lang="ts" setup>
import type { Database, Tables } from '~/types/supabase'
const route = useRoute();

const props = defineProps({
  path: {
    type: String,
    default: ''
  }
})
const { path } = toRefs(props)

const emit = defineEmits(['update:path', 'upload'])
const supabase = useSupabaseClient<Database>()
const uploading = ref(false)
const src = ref('')
const files = ref()
const dir = ref()

const uploadImage = async (evt: any) => {
  files.value = evt.target.files
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${dir.value}/${Math.random().toString().replace('.', '')}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

    if (uploadError) throw uploadError

    emit('update:path', filePath)
    emit('upload')
  } catch (error: any) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

const downloadImage = (filePath: string) => {
  const { data } = supabase
    .storage
    .from('images')
    .getPublicUrl(filePath)

  src.value = data.publicUrl
  console.log(src.value)
}

const updateArticle = async () => {
  await supabase
    .from('images')
    .insert({ article_id: dir.value, name: path.value.split('/')[1] })
}

watch(path, () => {
  if (path.value) {
    downloadImage(path.value)
    updateArticle()
  }
})

watch(() => route.query, (newId, oldId) => {
  // react to route changes...
  console.log('New id received: ', newId)
  dir.value = newId.id?.toString()
})
</script>

<template>
  <div class="flex-0">
    <label class="btn btn-outline btn-square" for="single">
      <span class="loading loading-spinner" v-if="uploading"></span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    </label>
    <input style="position: absolute; visibility: hidden;" type="file" id="single" accept="image/*" @change="uploadImage"
      :disabled="uploading" />
  </div>
</template>

<style scoped>
</style>
