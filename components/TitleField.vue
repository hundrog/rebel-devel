<script lang="ts" setup>
const router = useRouter()
const route = useRoute();

const articleStore = useArticlesStore()

const articleTitle = ref('')
const editing = ref(false)
const dirty = ref(false)

const defaultState = {
  published: false,
  id: '',
  title: 'New Article',
}

const article = ref({ ...defaultState })

async function setTitle() {
  if (dirty.value) {
    if (articleStore.article.id) {
      // Update the article
      await articleStore.updateArticle( articleStore.article.id.toString(), { title: articleTitle.value } )

      if (articleStore.errors) {
        console.log(articleStore.errors)
        articleStore.clearErrors()
      }
    } else {
      //create new article
      await articleStore.createArticle(articleTitle.value, '')

      if (articleStore.errors) {
        console.log(articleStore.errors)
        articleStore.clearErrors()
      } else {
        router.push({ query: { id: articleStore.article.id } })
      }
    }
  }

  dirty.value = false
  editing.value = false
}

watch(() => articleTitle.value, (newtitle, oldTitle) => {
  if (newtitle !== oldTitle) {
    dirty.value = true
  }
})

onMounted(async () => {
  if (route.query.id) {
    await articleStore.fetchSingle(route.query.id.toString())

    articleTitle.value = articleStore.article.title
  } else {
    console.log('Article no exists')
  }
})
</script>

<template>
  <div class="flex-1">
    <form @submit.prevent="setTitle" class="flex justify-start space-x-4">
      <div class="block w-full max-w-xl">
        <input name="title" type="text" :placeholder="defaultState.title" class="input-bordered w-full max-w-lg input"
          v-model="articleTitle" v-if="editing" />
        <h2 class="text-5xl" v-else>{{ articleTitle || defaultState.title }}</h2>
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
  <div class="badge badge-neutral" v-if="article.id">{{ article.published ? 'Published' : 'Draft' }}</div>
</template>

<style scoped>
</style>
