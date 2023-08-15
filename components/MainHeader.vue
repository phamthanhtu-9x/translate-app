<template>
  <header>
    <UiWrapperContent>
      <div class="flex justify-between py-2.5">
        <NuxtLink to="/">
          <div class="text-3xl font-medium text-blue-500 logo">Translate</div>
        </NuxtLink>
        <div class="flex space-x-3 header-actions">
          <Button @click="signIn" v-if="status !== 'authenticated'">Login</Button> 
          <NuxtLink to="/dashboard">
          <div class="text-3xl font-medium text-blue-500 logo">Dashboard</div>
          <Button @click="signOut" v-if="status === 'authenticated'">Logout</Button> 
        </NuxtLink>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
<script setup lang="ts">
const { status, signIn, signOut } = useAuth()
</script>
