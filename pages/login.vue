<script setup lang="ts">
import {useForm} from 'vee-validate';
import * as yup from 'yup';

definePageMeta({
  middleware: ['auth'],
});

const {signIn} = useAuth();

let submitting = ref();

interface FormData {
  email: string;
  password: string | number;
}

const handleSignIn = async (provider: String, formData?: Required<FormData>) => {
  submitting.value = true;

  switch (provider) {
    case 'google':
      await signIn('google', {callbackUrl: '/api/auth/callback/google'});
      break;

    case 'credentials':
      await signIn('credentials', formData);
      break;

    default:
      break;
  }

  submitting.value = false;
};

const {handleSubmit, isSubmitting} = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password').min(6),
  }),
});

const onSubmit = handleSubmit((values : any) => {
  handleSignIn('credentials', values);
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md mt-10">
      <form class="bg-white shadow-lg rounded px-12 pt-8 pb-10 mb-4" @submit="onSubmit" novalidate>
        <!-- @csrf -->
        <h1
          class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-8"
        >
          Log in to your account
        </h1>
        <div class="mb-4">
          <UiTextInput name="email" type="email" placeholder="Email" autofocus="true" />
        </div>

        <div class="mb-6">
          <UiTextInput name="password" type="password" placeholder="Password" />
        </div>

        <div class="flex items-center justify-between flex-col">
          <button
            class="px-4 py-2 rounded text-white shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full"
            type="submit"
            :disabled="submitting"
          >
            Submit
          </button>

          <div
            class="my-4 w-full flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
          >
            <p class="mx-4 mb-0 text-center dark:text-white">or</p>
          </div>

          <button
            @click.prevent="handleSignIn('google')"
            class="flex items-center justify-center px-4 py-2 rounded text-white shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full"
            type="submit"
            :disabled="submitting"
          >
            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
