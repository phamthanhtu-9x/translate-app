<script setup lang="ts">
interface Tag {
  active?: boolean;
}
const {active} = defineProps<Tag>();
</script>
<template>
  <div
    class="px-4 py-1 transition ease-in-out bg-gray-100 rounded-md cursor-pointer hover:shadow-md"
    :class="{'bg-blue-500 text-white pointer-events-none': active}"
  >
    <slot />
  </div>
</template>
