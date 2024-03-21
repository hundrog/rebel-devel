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
  <div class="relative flex mb-4">
    <label class="max-w-xs btn btn-primary" for="single">
      <span class="loading loading-spinner" v-if="uploading"></span>
      <span v-else>Upload Image</span>
    </label>
    <input style="position: absolute; visibility: hidden;" type="file" id="single" accept="image/*" @change="uploadImage"
      :disabled="uploading" />
  </div>
</template>

<style scoped>
</style>
