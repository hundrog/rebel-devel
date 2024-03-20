<script lang="ts" setup>
import { ref, toRefs, defineProps } from 'vue';

const props = defineProps(['path'])
const { path } = toRefs(props)

const emit = defineEmits(['update:path', 'upload'])

const supabase = useSupabaseClient()
const uploading = ref(false)
const src = ref('')
const files = ref()

const uploadImage = async (evt: any) => {
  files.value = evt.target.files
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${new Date(Date.now()).toISOString().slice(0, 10)}/${Math.random().toString().replace('.','')}.${fileExt}`
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
</script>

<template>
    <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar"
      style="width: 10em; height: 10em;"
    />

    <div class="relative flex justify-end">
      <label class="btn-block max-w-xs btn btn-primary" for="single">
        <span class="loading loading-spinner" v-if="uploading"></span>
        <span v-else>Upload Image</span>
      </label>
      <input
        style="position: absolute; visibility: hidden;"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadImage"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<style scoped></style>
