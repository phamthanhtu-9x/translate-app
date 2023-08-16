<script setup lang="ts">
interface TextAreaProps {
  focus?: boolean,
  edited?: boolean;
  loading?: boolean;
}
const {edited, loading, focus} = defineProps<TextAreaProps>();
const emit = defineEmits(['onChangeTextarea']);
const textAreaRef = ref();

const handleChange = () => {
  const changeDebounce = _debounce(() => {
    emit('onChangeTextarea', textAreaRef.value.innerText);
  }, 1000);
  changeDebounce();
}

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
    class="shadow-md rounded-lg w-full min-h-[500px] border border-gray-100 p-4 outline-blue-200 text-2xl relative break-all"
    :class="{
      'bg-gray-100': !edited,
    }"
    :contenteditable="edited ? true : false"
    @keydown="handleChange"
  >
    <div v-if="loading" class="w-full p-5 text-center">
      <UiCircleLoading />
    </div>
    <slot v-if="!edited && !loading" />
  </div>
</template>
