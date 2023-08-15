<script setup lang="ts">
const {status, signIn, signOut} = useAuth();
</script>
<template>
  <header>
    <UiWrapperContent>
      <div class="flex justify-between py-2.5">
        <NuxtLink to="/">
          <div class="text-3xl font-medium text-blue-500 logo">Translate</div>
        </NuxtLink>
        <div class="flex space-x-3 header-actions">
          <Button v-if="status !== 'authenticated'" @click="signIn">Login</Button>
          <NuxtLink to="/dashboard">
            <div class="text-3xl font-medium text-blue-500 logo">Dashboard</div>
            <Button v-if="status === 'authenticated'" @click="signOut">Logout</Button>
          </NuxtLink>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
