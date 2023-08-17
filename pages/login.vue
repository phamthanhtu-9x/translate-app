<script setup lang="ts">

const {signIn} = useAuth();

const formData = reactive({
  email: '',
  password: '',
});

const handleSignIn = (provider: String) => {
  switch (provider) {
    case 'google':
      signIn('google', {callbackUrl: '/api/auth/callback/google'});
      break;

    case 'credentials':
      signIn('credentials', formData);
      break;

    default:
      break;
  }
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md mt-10">
      <form class="bg-white shadow-lg rounded px-12 pt-8 pb-10 mb-4">
        <!-- @csrf -->
        <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-8">
            Log in to your account
        </h1>
        <div class="mb-4">
          <input
            class="shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            required
            autofocus
            placeholder="Email"
            v-model="formData.email"
          />
        </div>

        <div class="mb-6">
          <input
            class="shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            required
            autocomplete="current-password"
            v-model="formData.password"
          />
        </div>

        <div class="flex items-center justify-between flex-col">
          <button
            @click.prevent="handleSignIn('credentials')"
            class="px-4 py-2 rounded text-white shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full"
            type="submit"
          >
            Submit
          </button>

          <!-- <p class="text-center my-2">or</p> -->
          <div
            class="my-4 w-full flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 mb-0 text-center dark:text-white">
              or
            </p>
          </div>

          <button
            @click.prevent="handleSignIn('google')"
            class="px-4 py-2 rounded text-white shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full"
            type="submit"
          >
            Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
