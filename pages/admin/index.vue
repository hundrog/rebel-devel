<template>
  <div class="w-full px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 p-1 justify-end">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'btn btn-block max-w-xs hover:btn-active',
              selected ? 'btn btn-primary' : 'btn',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          class="bg-base-300 p-3"
        >
          <ul>
            <li
              v-for="post in posts"
              :key="post.id"
              class="relative p-3 hover:bg-base-200 dark:hover:bg-base-100 border-neutral-content border-b"
            >
              <h3 class="text-sm font-medium leading-5">
                {{ post.title }}
              </h3>

              <ul
                class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
              >
                <li v-if="post.created_at">
                  Created at
                  {{ new Date(post.created_at).toISOString().slice(0, 10) }}
                </li>
              </ul>

              <NuxtLink :to="`write?id=${post.id}`" class="absolute inset-0" />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const articleStore = useArticlesStore();

onMounted(async () => {
  await articleStore.fetchDrafts();

  if (articleStore.drafts) {
    categories.value["Drafts"] = articleStore.drafts;
  }

  await articleStore.fetchPublished();

  if (articleStore.published) {
    categories.value["Published"] = articleStore.published;
  }
});

const categories = ref({
  Drafts: [
    {
      content: "",
      created_at: "",
      id: "",
      published: false,
      title: "",
    },
  ],
  Published: [
    {
      content: "",
      created_at: "",
      id: "",
      published: true,
      title: "",
    },
  ],
});
</script>
