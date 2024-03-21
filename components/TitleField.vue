<script lang="ts" setup>
import type { Database, Tables } from '~/types/supabase'
const router = useRouter()

const supabase = useSupabaseClient<Database>()
const editing = ref(false)
const dirty = ref(false)

const defaultState = {
  content: '',
  id: '',
  title: 'New Article',
}

const article = ref({...defaultState})

async function setTitle() {
  if (dirty.value) {
    if (article.value?.id) {
      // Update the article in supabase
      const { data, error } = await supabase
        .from('articles')
        .update({ title: article.value.title })
        .eq('id', article.value.id)
        .select()
      if (error) {
        console.log(error)
      }
    } else {
      //create new article
      const { data, error } = await supabase
        .from('articles')
        .insert({ title: article.value.title, category_id: 1 })
        .select('id, title, content')
      if (!error && data) {
        article.value = data[0]
        router.push({ query: { id: article.value.id } })
      } else {
        console.log(error)
      }
    }
  }

  dirty.value = false
  editing.value = false
}

watch(() => article.value.title, (newtitle, oldTitle) => {
  if (newtitle !== oldTitle) { dirty.value = true }
})
</script>

<template>
  <div class="flex-1">
    <form @submit.prevent="setTitle" class="flex justify-start space-x-4">
      <div class="block w-full max-w-xl">
        <input name="title" type="text" :placeholder="defaultState.title" class="input-bordered w-full max-w-lg input"
          v-model="article.title" v-if="editing" />
        <h2 class="text-5xl" v-else>{{ article?.title || defaultState.title }}</h2>
      </div>
      <div class="flex flex-col" v-if="editing">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 hover:text-primary active:text-primary/75 cursor-pointer" @click="setTitle">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 hover:text-secondary active:text-secondary/75 cursor-pointer" @click="editing = !editing">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6 hover:text-primary active:text-primary/75 cursor-pointer" @click="editing = !editing" v-else>
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    </form>
  </div>
</template>

<style scoped>
</style>
