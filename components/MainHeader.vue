<script setup lang="ts">
import {useToast} from 'tailvue';
const $toast = useToast();

const {status, signIn, signOut, data} = useAuth();
const user = ref();
const isToastShown = localStorage.getItem('isToastShown');

if (status.value === 'authenticated') {
  user.value = data.value?.user;
}

if (status.value === 'authenticated' && !isToastShown) {
  $toast.success('Success!! 🎉')
  localStorage.setItem('isToastShown', 'true');

  user.value = data.value?.user;
}

const handleSignOut = () => {
  localStorage.removeItem('isToastShown');
  signOut();
};
</script>
<template>
  <header>
    <UiWrapperContent>
      <div class="flex justify-between py-2.5">
        <NuxtLink to="/">
          <div class="text-3xl font-medium text-blue-500 logo">Translate</div>
        </NuxtLink>
        <button v-if="status !== 'authenticated'" @click="signIn">Login</button>
        <div v-else class="flex items-center space-x-3">
          <div class="px-3 py-1 border rounded-md">
            <UiTextNormal>{{ user.name }}</UiTextNormal>
          </div>
          <button @click="handleSignOut">Logout</button>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
