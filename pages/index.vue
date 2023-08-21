<script setup lang="ts">
import {formatPastedContent, moveLanguageToTop, addLanguageToList} from '../helpers/translate.helper';
import {Language} from '../types/index';
import {getSupportedLanguages} from '../api/language';
import {translateGenerateResult} from '../api/translate';

enum EOPTIONSTRANSLATE {
  TEXT = 'text',
  FILE = 'file',
}
enum ETRANSLATE {
  PLACEHOLDER = 'Bản dịch',
  LANGUAGE_OUT_DEFAULT = 'vi',
}

const buttonLanguageIn = ref();
const buttonLanguageOut = ref();
const contentInRef = ref();
const currentOption = ref<EOPTIONSTRANSLATE>(EOPTIONSTRANSLATE.TEXT);
const currentLanguageIn: Language = reactive({
  language: '',
});
const currentLanguageOut: Language = reactive({
  language: ETRANSLATE.LANGUAGE_OUT_DEFAULT,
});
const state = reactive<{
  languagesListIn: Language[];
  languagesListOut: Language[];
  translationContent: any;
  translateLoading: boolean;
}>({
  languagesListIn: [],
  languagesListOut: [
    {
      language: ETRANSLATE.LANGUAGE_OUT_DEFAULT,
    },
  ],
  translationContent: ETRANSLATE.PLACEHOLDER,
  translateLoading: false,
});
const languagesListIn = computed(() => {
  return moveLanguageToTop(state.languagesListIn, currentLanguageIn);
});
const languagesListOut = computed(() => {
  return moveLanguageToTop(state.languagesListOut, currentLanguageOut);
});

const {data: dataLanguages} = await useAsyncData('languages', () => getSupportedLanguages());

const getLanguageName = (source: string) => {
  if (dataLanguages.value?.data.languages === undefined) return;
  return dataLanguages.value?.data.languages.find(
    (language: Language) => language.language === source,
  ).name;
};

const handleTextAreaChange = async (value: string, isValid: boolean, textAreaRef: any) => {
  if (value === '' || !isValid) {
    state.translationContent = ETRANSLATE.PLACEHOLDER;
    return;
  }

  contentInRef.value = textAreaRef.value;

  state.translateLoading = true;
  const payload = {
    text: formatPastedContent(value),
    source: '',
    target: currentLanguageOut.language,
  };

  const {data: dataTranslate} = await useAsyncData(
    'translate',
    () => translateGenerateResult(payload),
    {
      server: false,
    },
  );

  state.translateLoading = false;
  state.translationContent = dataTranslate.value?.data;

  if (currentLanguageIn.language !== dataTranslate.value?.source) {
    currentLanguageIn.name = getLanguageName(dataTranslate.value?.source);
    currentLanguageIn.language = dataTranslate.value?.source;
  }
};

const handleSelectedLanguageIn = (language: Language) => {
  console.log('selected in', language);

  // Close pannel
  buttonLanguageIn.value.$el.click();
};

const handleSelectedLanguageOut = (language: Language) => {
  console.log('selected out', language);

  // Close pannel
  buttonLanguageOut.value.$el.click();
};

const handleSwapTranslate = () => {
  const temp = {
    content: state.translationContent,
    language: currentLanguageOut.language,
  };

  if (state.translationContent !== ETRANSLATE.PLACEHOLDER) {
    state.translationContent = contentInRef.value.innerHTML;
    contentInRef.value.innerHTML = temp.content;
  };
 
  state.languagesListOut = [];

  state.languagesListIn = addLanguageToList(state.languagesListIn, currentLanguageOut);
  state.languagesListOut = addLanguageToList(state.languagesListOut, currentLanguageIn);

  currentLanguageOut.language = currentLanguageIn.language;
  currentLanguageIn.language = temp.language;
}
</script>
<template>
  <UiWrapperContent>
    <div class="flex mb-8 space-x-3">
      <UiOptionCard
        title="Translate text"
        icon="streamline:interface-text-formatting-translate-options-text-translate"
        desc="136 languages"
        :active="currentOption === EOPTIONSTRANSLATE.TEXT ? true : false"
      />
      <UiOptionCard
        title="Translate files"
        desc=".pdf, .docx"
        icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
        :disabled="true"
        :active="currentOption === EOPTIONSTRANSLATE.FILE ? true : false"
      />
    </div>
    <div class="flex">
      <div class="relative flex-1">
        <div class="flex items-center px-5 mb-5 space-x-3">
          <div>
            <UiTextNormal>Detect language</UiTextNormal>
          </div>
          <ul v-if="currentLanguageIn.language !== ''" class="flex space-x-3">
            <li v-for="language in languagesListIn" :key="language.language">
              <UiTextTag :active="language.language === currentLanguageIn.language">{{
                getLanguageName(language.language)
              }}</UiTextTag>
            </li>
          </ul>
          <HeadlessPopover>
            <HeadlessPopoverButton ref="buttonLanguageIn" class="outline-none">
              <UiCirlceButton>
                <Icon name="mdi:chevron-down" size="1.5em" color="gray" />
              </UiCirlceButton>
            </HeadlessPopoverButton>
            <HeadlessTransitionRoot
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessPopoverPanel class="absolute left-0 z-10 top-[54px] w-full">
                <UiSearchPannel
                  :language-list="dataLanguages"
                  @selected-language="handleSelectedLanguageIn"
                />
              </HeadlessPopoverPanel>
            </HeadlessTransitionRoot>
          </HeadlessPopover>
        </div>
        <UiTextArea :edited="true" :focus="true" @onChangeTextarea="handleTextAreaChange" />
      </div>
      <UiCirlceButton @click="handleSwapTranslate">
        <Icon name="mdi:swap-horizontal" size="1.5em" color="gray" />
      </UiCirlceButton>
      <div class="relative flex-1">
        <div class="flex px-5 mb-5 space-x-3">
          <ul v-if="currentLanguageOut.language !== ''" class="flex space-x-3">
            <li v-for="language in languagesListOut" :key="language.language">
              <UiTextTag :active="language.language === currentLanguageOut.language">{{
                getLanguageName(language.language)
              }}</UiTextTag>
            </li>
          </ul>
          <HeadlessPopover>
            <HeadlessPopoverButton ref="buttonLanguageOut" class="outline-none">
              <UiCirlceButton>
                <Icon name="mdi:chevron-down" size="1.5em" color="gray" />
              </UiCirlceButton>
            </HeadlessPopoverButton>
            <HeadlessTransitionRoot
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessPopoverPanel class="absolute left-0 z-10 top-[54px] w-full">
                <UiSearchPannel
                  :language-list="dataLanguages"
                  :language-active="currentLanguageOut.language"
                  @selected-language="handleSelectedLanguageOut"
                />
              </HeadlessPopoverPanel>
            </HeadlessTransitionRoot>
          </HeadlessPopover>
        </div>
        <UiTextArea :loading="state.translateLoading">
          <span v-html="state.translationContent" />
        </UiTextArea>
      </div>
    </div>
  </UiWrapperContent>
</template>
