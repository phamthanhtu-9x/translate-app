<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
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

const showPassword = ref(false);
const typeInput = ref(props.type);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
  typeInput.value = typeInput.value === 'password' ? 'text' : 'password';
}
</script>

<template>
  <div class="TextInput relative">
    <input
      class="shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{'border-red-500': !!errorMessage}"
      required
      :autofocus="autofocus"
      :placeholder="placeholder"
      :name="name"
      :type="typeInput"
      v-model="value"
    />

    <span v-if="type === 'password'" @click="toggleShow" class="absolute top-2 right-2.5 cursor-pointer">
      <Icon :name="showPassword ? 'clarity:eye-show-solid' : 'clarity:eye-hide-solid'" size="1.2rem" color="rgba(0, 0, 0, 0.3)" />
    </span>

    <p v-if="!!errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>
