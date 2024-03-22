<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const logIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) { console.log(error) }
  else {
    return navigateTo('/confirm')
  }
}
</script>
<template>
<div class="bg-base-100 shadow-2xl mx-auto mt-4 md:mt-24 w-full max-w-md card">
  <form class="card-body" @submit.prevent="logIn">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" placeholder="email" class="input-bordered input" required v-model="email" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input type="password" placeholder="password" class="input-bordered input" required v-model="password" />
      <label class="label">
      </label>
    </div>
    <div class="form-control mt-6">
      <button class="btn btn-primary" @click="logIn">Login</button>
    </div>
  </form>
</div>
</template>


<style scoped>
</style>
