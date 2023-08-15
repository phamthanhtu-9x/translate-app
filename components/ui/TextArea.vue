<script setup lang="ts">
interface TextAreaProps {
  disabled?: boolean;
  loading?: boolean;
}
const {disabled, loading} = defineProps<TextAreaProps>();
</script>
<template>
  <div
    class="shadow-md rounded-lg w-full min-h-[500px] border border-gray-100 p-4 outline-blue-200 text-2xl relative"
    :class="{
      'bg-gray-100': disabled,
    }"
    :contenteditable="!disabled ? true : false"
  >
    <div v-if="loading" class="w-full p-5 text-center">
      <UiCircleLoading />
    </div>
    <slot v-if="disabled && !loading" />
  </div>
</template>
