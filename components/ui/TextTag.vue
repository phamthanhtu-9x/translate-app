<script setup lang="ts">
interface TagProps {
  active?: boolean;
}
const {active} = defineProps<TagProps>();
</script>
<template>
  <div
    class="px-4 py-1 transition ease-in-out rounded-md cursor-pointer hover:shadow-md"
    :class="{
      'bg-gray-100': !active,
      'bg-blue-500 text-white pointer-events-none': active,
    }"
  >
    <slot />
  </div>
</template>
