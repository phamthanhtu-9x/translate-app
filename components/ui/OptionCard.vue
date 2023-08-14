<script setup lang="ts">
interface OptionCard {
  title: string;
  desc: string;
  icon: string;
  active?: boolean;
  disabled?: boolean;
}
const {title, desc} = defineProps<OptionCard>();
</script>
<template>
  <div
    class="inline-block p-3 transition ease-in-out border border-gray-100 rounded-md cursor-pointer hover:bg-blue-100 min-w-[200px] shadow-md"
    :class="{
      'opacity-80 pointer-events-none cursor-not-allowed': disabled,
      'border-blue-500 border-2 pointer-events-none': active,
    }"
  >
    <div class="flex items-center space-x-3">
      <Icon :name="icon" size="1.5em" color="gray" />
      <div>
        <div class="mb-0.5 text-md font-medium">{{ title }}</div>
        <div class="text-sm text-gray-500">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>
