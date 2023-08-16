<script setup lang="ts">
interface TextAreaProps {
  focus?: boolean,
  disabled?: boolean;
  loading?: boolean;
}
const {disabled, loading, focus} = defineProps<TextAreaProps>();
const textAreaRef = ref();
onMounted(() => {
  nextTick(() => {
    if(focus) {
      textAreaRef.value.focus();
    }
  })
})
</script>
<template>
  <div
    ref="textAreaRef"
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
