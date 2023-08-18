<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  name: String,
    default: '',
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const {value, errorMessage} = useField(() => props.name);
</script>

<template>
  <div class="TextInput">
    <input
      class="shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{'border-red-500': !!errorMessage}"
      required
      :autofocus="autofocus"
      :placeholder="placeholder"
      :name="name"
      :type="type"
      v-model="value" 
    />

    <p v-if="!!errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>
