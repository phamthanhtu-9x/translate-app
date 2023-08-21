<script setup lang="ts">
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {register} from '../api/user';

const {signIn} = useAuth();
let submitting = ref();

const {handleSubmit} = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .required('Please enter your name.')
      .min(2, 'Please enter at least 2 characters.'),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password').min(6),
  }),
});

const onSubmit = handleSubmit( async (values : any) => {
  submitting.value = true;

  try {
    const {data} : any = await register(values);

    const formData = {
      email: data.email,
      password: values.password
    }

    await signIn('credentials', formData);
    
  } catch (error) {
    console.log('Failed to register', error);
  }

  submitting.value = false;
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
          Create and account
        </h1>

        <div class="mb-4">
          <UiTextInput name="name" placeholder="Name" autofocus="true" />
        </div>

        <div class="mb-4">
          <UiTextInput name="email" type="email" placeholder="Email" />
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
            Create an account
          </button>

          <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-6">
            Already have an account? 
            <NuxtLink to="/login" class="font-medium hover:underline text-blue-500">Login here</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
