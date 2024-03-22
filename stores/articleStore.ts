import type { Tables, Database } from '~/types/supabase'

export const useArticlesStore = defineStore('articles', () => {
    const supabase = useSupabaseClient<Database>()
    const defaulArticle = {
        content: '',
        created_at: '',
        id: '',
        published: false,
        title: '',
    } as Tables<'articles'>

    const article = ref(defaulArticle)
    const drafts = ref([defaulArticle])
    const errors = ref()

    const articleStatus = computed(() => {
        if (!article.value.id) { return 'Not Saved' }

        return article.value.published ? 'Published' : 'Draft'
    })

    function setId(val: string) {
        article.value.id = val
    }

    function setTitle(val: string) {
        article.value.title = val
    }

    function setContent(val: string) {
        article.value.content = val
    }

    function clearErrors() {
        errors.value = undefined
    }

    async function createArticle(title: string, content: string) {
        const { data, error } = await supabase
            .from('articles')
            .insert({ title: title, content: content })
            .select('*')

        if (!error) { article.value = data[0] }
        else { errors.value = error }
    }

    async function updateArticle(id: string, options: {
        content?: string,
        published?: boolean,
        title?: string
    }) {
        const { data, error } = await supabase
            .from('articles')
            .update({
                ...options
            })
            .eq('id', id)
            .select('*')

        if (!error) { article.value = data[0] }
        else { errors.value = error }
    }

    async function fetchSingle(id: string) {
        const { data, error } = await supabase
            .from('articles')
            .select("*")
            .eq('id', id)

        if (!error) { article.value = data[0] }
        else { errors.value = error }
    }

    async function fetchDrafts() {
        const { data, error } = await supabase
            .from('articles')
            .select("*")
            .eq('published', false)

        if (!error) { drafts.value = data }
        else { errors.value = error }
    }

    return {
        article,
        errors,
        drafts,
        clearErrors,
        articleStatus,
        fetchSingle,
        createArticle,
        updateArticle,
        fetchDrafts
    }
})
