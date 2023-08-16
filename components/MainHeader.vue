<script setup lang="ts">
const {status, signIn, signOut, data} = useAuth();
const user = ref();
if (status.value === 'authenticated'){
  user.value = data.value?.user
}
</script>
<template>
  <header>
    <UiWrapperContent>
      <div class="flex justify-between py-2.5">
        <NuxtLink to="/">
          <div class="text-3xl font-medium text-blue-500 logo">Translate</div>
        </NuxtLink>
        <Button v-if="status !== 'authenticated'" @click="signIn">Login</Button>
        <div v-else class="flex items-center space-x-3">
          <div class="px-3 py-1 border rounded-md">
            <UiTextNormal>{{ user.name }}</UiTextNormal>
          </div>
          <Button  @click="signOut">Logout</Button>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
