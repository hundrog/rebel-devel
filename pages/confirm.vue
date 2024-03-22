<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/articles')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex justify-center mt-52">
    <span class="loading loading-bars loading-lg"></span>
  </div>
</template>


<style scoped></style>
