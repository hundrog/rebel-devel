<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (!error) {
    return navigateTo("/")
  }
}
</script>

<template>
  <div class="bg-base-100 navbar">
    <div class="flex-1">
      <NuxtLink to="/" class="text-xl btn btn-ghost">The R.D</NuxtLink>
    </div>
    <div class="flex-none gap-2 mr-4">
      <div class="form-control">
        <!-- <input type="text" placeholder="Search" class="input-bordered w-24 md:w-auto input input-sm" /> -->
      </div>
      <ul class="px-1 menu menu-horizontal" v-if="user">
        <li>
          <details>
            <summary>
              Actions
            </summary>
            <ul class="bg-base-100 p-2 rounded-t-none">
              <li>
                <NuxtLink to="/articles">Articles</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/articles/write">Write</NuxtLink>
              </li>
              <li><button @click="signOut">Logout</button></li>
            </ul>
          </details>
        </li>
      </ul>

      <label class="flex gap-2 cursor-pointer">
        <input type="checkbox" value="cyberdark" class="theme-controller toggle" data-toggle-theme="light,dark"
          data-act-class="ACTIVECLASS" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  </div></template>

<style scoped>
</style>
