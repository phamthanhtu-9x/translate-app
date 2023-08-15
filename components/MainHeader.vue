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
          <Button v-else @click="signOut">Logout</Button>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
