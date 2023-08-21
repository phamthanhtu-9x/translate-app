<script setup lang="ts">
import {Language} from 'types';

interface SearchPannelProps {
  languageList?: any;
  languageActive?: any;
}
const {languageActive, languageList} = defineProps<SearchPannelProps>();
const inputRef = ref();
const state = reactive({
  languageList: languageList.data.languages,
});
const emit = defineEmits(['selectedLanguage']);

const selectedLanguage = (language: Language) => {
  emit('selectedLanguage', language);
};

const handleSearch = (event: Event) => {
  event.preventDefault();
  if (inputRef.value.value !== '') {
    state.languageList = state.languageList.filter(
      (item: Language) =>
        item.name?.includes(inputRef.value.value) || item.language?.includes(inputRef.value.value),
    );
  } else {
    state.languageList = languageList.data.languages;
  }
};

onMounted(() => {
  nextTick(() => {
    inputRef.value.focus();
  });
});
</script>
<template>
  <div
    class="h-[500px] border border-gray-100 bg-white shadow-md rounded-lg w-full p-4 overflow-auto"
  >
    <div
      class="flex items-center p-1.5 border rounded-md search-input border-blue-200 focus:border-blue-100 mb-3"
    >
      <div class="flex items-center justify-center flex-shrink-0 mr-2 w-7 h-7">
        <Icon name="mdi:magnify" size="1.5em" color="gray"></Icon>
      </div>
      <input
        ref="inputRef"
        type="text"
        placeholder="Language Search"
        class="w-full outline-none"
        @input="handleSearch"
      />
    </div>
    <ul class="grid grid-cols-3 grid-rows-3 gap-4">
      <li v-for="language in state.languageList">
        <div
          class="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100"
          :class="{
            'text-blue-500 bg-blue-200 pointer-events-none': language.language === languageActive,
          }"
          @click="selectedLanguage(language)"
        >
          {{ language.name }}
          <Icon
            v-if="language.language === languageActive"
            name="mdi:check"
            size="1.5em"
            color="#3b82f6"
          ></Icon>
        </div>
      </li>
    </ul>
  </div>
</template>
